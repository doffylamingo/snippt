import app from "./app";

Bun.serve({
  port: 3000,
  hostname: "0.0.0.0",
  fetch: app.fetch,
  idleTimeout: 30,
});
