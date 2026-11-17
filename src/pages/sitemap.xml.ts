import type { APIRoute } from "astro";
import { categories, categoryHref } from "../lib/categories";
import { SITE, itemHref, items, itemsInCategory, latest, pageCount, pageHref } from "../lib/items";

const day = (date: string) => date.slice(0, 10);

export const GET: APIRoute = () => {
  const newest = latest[0] ? day(latest[0].created_at) : day(new Date().toISOString());
  const urls = [
    ...Array.from({ length: pageCount }, (_, i) => ({ loc: pageHref(i + 1), lastmod: newest })),
    ...categories
      .filter((c) => c.slug !== "other")
      .map((c) => itemsInCategory(c.slug))
      .filter((list) => list.length > 0)
      .map((list) => ({ loc: categoryHref(list[0].category!), lastmod: day(list[0].created_at) })),
    ...items.map((item) => ({ loc: itemHref(item), lastmod: day(item.created_at) })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
