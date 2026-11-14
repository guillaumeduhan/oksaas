import data from "../../data.json";

export interface Item {
  id: string;
  title: string;
  url: string;
  created_at: string;
  is_promoted?: boolean;
  is_featured?: boolean;
}

export const PAGE_SIZE = 50;

const items = data as Item[];

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

export function domain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

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
