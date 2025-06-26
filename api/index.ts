import { auth } from "@/lib/auth";
import { factory } from "./app";
import { spotifyRoutes } from "./routes/spotify";

const app = factory.createApp().basePath("/api");

app.on(["POST", "GET"], "/auth/*", c => {
  return auth.handler(c.req.raw);
});

const routes = app.route("/spotify", spotifyRoutes);

export type ApiRoute = typeof routes;
export default app;
