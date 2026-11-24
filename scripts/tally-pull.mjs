// Pulls new submissions from the Tally form (https://tally.so/forms/gDbJaO) that are not yet in data.json.
// Usage: node scripts/tally-pull.mjs > /tmp/pending.json
// Needs TALLY_API_KEY in .env.local (gitignored). Dedups by normalized URL against data.json and within the batch.
// Output: JSON array, oldest first, with { created_at, email, title, description, url, image_url } — category/tag
// are picked by hand (see AGENT.md) before appending to data.json.
import { readFileSync } from "node:fs";

const FORM_ID = "gDbJaO";
const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n").filter((l) => l.includes("=")).map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim().replace(/^"|"$/g, "")]),
);
const KEY = process.env.TALLY_API_KEY ?? env.TALLY_API_KEY;
if (!KEY) throw new Error("TALLY_API_KEY missing in .env.local");

const data = JSON.parse(readFileSync(new URL("../data.json", import.meta.url), "utf8"));
const norm = (u = "") => u.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/[?#].*$/, "").replace(/\/+$/, "");
const known = new Set(data.map((d) => norm(d.url)));
const lastDate = data.reduce((m, d) => (d.created_at > m ? d.created_at : m), "");
const since = new Date(new Date(lastDate).getTime() - 3 * 24 * 3600e3); // margin: dedup by URL handles overlap

const Q = { email: "eeZDaq", title: "W59r8J", description: "aYNe29", url: "62JeZe", image_url: "72lbNL", plan: "bxV9We" };
const out = [];
for (let page = 1; ; page++) {
  const res = await fetch(`https://api.tally.so/forms/${FORM_ID}/submissions?page=${page}&limit=100`, { headers: { Authorization: `Bearer ${KEY}` } });
  if (!res.ok) throw new Error(`Tally ${res.status}: ${await res.text()}`);
  const { submissions, hasMore } = await res.json();
  let reachedOld = false;
  for (const s of submissions) {
    if (new Date(s.submittedAt) < since) { reachedOld = true; continue; }
    const a = (id) => { const r = s.responses.find((r) => r.questionId === id)?.answer; return Array.isArray(r) ? r.join(", ") : (r ?? "").toString().trim(); };
    const e = { created_at: s.submittedAt.replace(/\.\d+Z$/, "Z"), email: a(Q.email), title: a(Q.title), description: a(Q.description), url: a(Q.url), image_url: a(Q.image_url), plan: a(Q.plan) };
    if (!e.url || !e.title) continue;
    const k = norm(e.url);
    if (known.has(k)) continue;
    known.add(k);
    out.push(e);
  }
  if (!hasMore || reachedOld) break;
}
out.sort((x, y) => x.created_at.localeCompare(y.created_at));
console.log(JSON.stringify(out, null, 2));
console.error(`${out.length} new submission(s) since ${lastDate}`);
