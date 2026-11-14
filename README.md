# Oksaas

A curated directory of SaaS products built with Astro.

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`    |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview build locally before deploying       |

## Local dev

`make` (or `npm run dev`) serves the site on **http://oksaas.localhost** — a small proxy on :80, shared with the other local projects through `~/.config/localhost-proxy/routes.json`, forwards to `astro dev` on :4321.
