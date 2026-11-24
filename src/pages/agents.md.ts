import type { APIRoute } from "astro";
import { categories, categoryHref } from "../lib/categories";
import { SITE, itemHref, items, itemsInCategory, label, latest } from "../lib/items";

// /agents.md — what oksaas.co is and how an AI agent should use it. Rebuilt with the site, so counts stay current.
export const GET: APIRoute = () => {
  const hubs = categories
    .filter((c) => c.slug !== "other")
    .map((c) => ({ c, n: itemsInCategory(c.slug).length }))
    .filter(({ n }) => n > 0);

  const body = `# oksaas.co — for agents

> oksaas.co is a curated directory of SaaS products, indie tools and startup launches. Makers list their product for free and get a dofollow backlink; people come to discover new tools by category or by recency.

- Site: ${SITE}
- Listings: ${items.length} products, newest added ${latest[0]?.created_at.slice(0, 10) ?? "—"}
- Updated: several times a week, in batches
- Also: [llms.txt](${SITE}/llms.txt) · [sitemap.xml](${SITE}/sitemap.xml)

## What you can do here

- **Find a tool for a need**: browse a category page, each lists every product of that kind, newest first, with a short description and product type.
- **Read one product**: every product has its own page with description, product type, launch date, outbound link and alternatives in the same category.
- **Follow new launches**: the homepage lists the latest launches (50 per page, then \`/page/2\`, \`/page/3\`…).
- **Submit a product** (for a maker, with their consent): fill the form at https://tally.so/r/gDbJaO — contact email, product name, short description, URL and a square logo URL. The free plan is "Listing + Backlink Dofollow". Listings are reviewed by hand before they go live. Submit each product once.

## URL structure

| Page | URL |
| :--- | :--- |
| Latest launches | \`${SITE}/\` then \`/page/<n>\` |
| Category | \`${SITE}/category/<slug>\` |
| Product | \`${SITE}/saas/<slug>\` |

All pages are static HTML with JSON-LD; no API, no login. Crawling is allowed (see robots.txt). Outbound links carry \`utm_source=oksaas\`; paid placements are marked \`rel="sponsored"\`.

## Categories

${hubs.map(({ c, n }) => `- [${c.name}](${SITE}${categoryHref(c.slug)}) — ${n} products`).join("\n")}

## Latest launches

${latest
  .slice(0, 20)
  .map((i) => `- [${i.title}](${SITE}${itemHref(i)}) — ${label(i)}`)
  .join("\n")}

## Contact

Questions about a listing: submit through the form above or visit ${SITE}.
`;
  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
};
