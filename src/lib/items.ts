import data from "../../data.json";

export interface Item {
  id: string;
  title: string;
  url: string;
  created_at: string;
  is_promoted?: boolean;
  is_featured?: boolean;
  description?: string;
  image_url?: string;
  category?: string;
  /** Where clicks go when it differs from `url` (affiliate/referral link). `url` stays the displayed site. */
  link?: string;
  slug: string;
}

export const SITE = "https://www.oksaas.co";
export const PAGE_SIZE = 50;

function slugify(title: string): string {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
}

// Slugs are assigned oldest first, so an existing page keeps its URL when newer
// launches with the same name arrive (they get -2, -3…).
const taken = new Set<string>();
const slugById = new Map<string, string>();
for (const raw of [...(data as Omit<Item, "slug">[])].sort((a, b) => a.created_at.localeCompare(b.created_at))) {
  const base = slugify(raw.title) || raw.id.slice(0, 8);
  let slug = base;
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
  taken.add(slug);
  slugById.set(raw.id, slug);
}

export const items: Item[] = (data as Omit<Item, "slug">[]).map((i) => ({ ...i, slug: slugById.get(i.id)! }));

export const itemHref = (item: Item) => `/saas/${item.slug}`;

const newestFirst = (a: Item, b: Item) => b.created_at.localeCompare(a.created_at);

/** Every listing of a category, newest first (sponsored and featured included). */
export const itemsInCategory = (slug: string) => items.filter((i) => i.category === slug).sort(newestFirst);

// Sponsored (promoted) first, then featured.
export const featured = [
  ...items.filter((i) => i.is_promoted),
  ...items.filter((i) => i.is_featured && !i.is_promoted),
];

export const latest = items
  .filter((i) => !i.is_promoted && !i.is_featured)
  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

export const pageCount = Math.max(1, Math.ceil(latest.length / PAGE_SIZE));

export const pageItems = (page: number) => latest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

export const pageHref = (page: number) => (page <= 1 ? "/" : `/page/${page}`);

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export function domain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Outbound href for a listing: its referral link as-is, else its site with utm_source. */
export const outboundHref = (item: Item) => item.link ?? withUtm(item.url);

/** rel for outbound links: paid placements are marked sponsored, free listings stay dofollow. */
export const outboundRel = (item: Item) => (item.is_promoted || item.link ? "sponsored noopener" : "noopener");

export function withUtm(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", "oksaas");
    return u.toString();
  } catch {
    return url;
  }
}

export function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days >= 365) return `${Math.floor(days / 365)}y ago`;
  if (days >= 30) return `${Math.floor(days / 30)}mo ago`;
  if (days >= 7) return `${Math.floor(days / 7)}w ago`;
  if (days >= 1) return `${days}d ago`;
  if (hours >= 1) return `${hours}h ago`;
  if (minutes >= 1) return `${minutes}m ago`;
  return "just now";
}
