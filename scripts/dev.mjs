// Starts `astro dev` on PORT plus a tiny reverse proxy on :80, so the app answers on
// http://HOST.localhost (browsers resolve *.localhost to this Mac; macOS lets regular
// users listen on :80). Hot reload WebSockets are forwarded too.
// Several projects share :80: each one records `host → port` in ~/.config/localhost-proxy/routes.json,
// and whichever proxy holds :80 routes every request by its Host header.
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";

const HOST = "oksaas.localhost";
const TARGET = Number(process.env.PORT ?? 4321);
const LISTEN = Number(process.env.PROXY_PORT ?? 80);

const ROUTES = path.join(os.homedir(), ".config", "localhost-proxy", "routes.json");
const readRoutes = () => { try { return JSON.parse(readFileSync(ROUTES, "utf8")); } catch { return {}; } };
mkdirSync(path.dirname(ROUTES), { recursive: true });
// Written to a temp file then renamed, so two projects starting together never leave half a file.
const tmp = `${ROUTES}.${process.pid}`;
writeFileSync(tmp, JSON.stringify({ ...readRoutes(), [HOST]: TARGET }, null, 2));
renameSync(tmp, ROUTES);
const portFor = (host = "") => readRoutes()[host.split(":")[0].toLowerCase()] ?? TARGET;

const proxy = http.createServer((req, res) => {
  const port = portFor(req.headers.host);
  const up = http.request(
    { host: "127.0.0.1", port, method: req.method, path: req.url, headers: req.headers },
    (r) => {
      res.writeHead(r.statusCode ?? 502, r.headers);
      r.pipe(res);
    },
  );
  up.on("error", () => {
    if (!res.headersSent) res.writeHead(502, { "content-type": "text/plain; charset=utf-8" });
    res.end(`Le serveur Astro ne répond pas sur le port ${port}.`);
  });
  req.pipe(up);
});

proxy.on("upgrade", (req, socket, head) => {
  const up = net.connect(portFor(req.headers.host), "127.0.0.1", () => {
    up.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);
    for (let i = 0; i < req.rawHeaders.length; i += 2) up.write(`${req.rawHeaders[i]}: ${req.rawHeaders[i + 1]}\r\n`);
    up.write("\r\n");
    if (head?.length) up.write(head);
    up.pipe(socket).pipe(up);
  });
  up.on("error", () => socket.destroy());
  socket.on("error", () => up.destroy());
});

proxy.on("error", (e) => {
  if (e.code === "EADDRINUSE") console.log(`▸ http://${HOST} (port ${LISTEN} déjà servi par le proxy d'un autre projet ; sinon http://${HOST}:${TARGET})`);
  else console.warn(`▸ Proxy désactivé (${e.message}) : utilise http://${HOST}:${TARGET}`);
});
proxy.listen(LISTEN, () => {
  const suffix = LISTEN === 80 ? "" : `:${LISTEN}`;
  console.log(`▸ http://${HOST}${suffix}`);
});

const astro = spawn("npx", ["astro", "dev", "--host", "127.0.0.1", "--port", String(TARGET)], { stdio: "inherit" });
const stop = () => {
  proxy.close();
  astro.kill("SIGINT");
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
astro.on("exit", (code) => process.exit(code ?? 0));
