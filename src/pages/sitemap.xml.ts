import type { APIRoute } from "astro";
import { SITE, itemHref, items, latest, pageCount, pageHref } from "../lib/items";

const day = (date: string) => date.slice(0, 10);

export const GET: APIRoute = () => {
  const newest = latest[0] ? day(latest[0].created_at) : day(new Date().toISOString());
  const urls = [
    ...Array.from({ length: pageCount }, (_, i) => ({ loc: pageHref(i + 1), lastmod: newest })),
    ...items.map((item) => ({ loc: itemHref(item), lastmod: day(item.created_at) })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
