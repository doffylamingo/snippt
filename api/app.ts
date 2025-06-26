import { cors } from "hono/cors";
import { createFactory } from "hono/factory";
import { auth } from "@/lib/auth";

type InferSession = typeof auth.$Infer.Session;
export type Variables = {
  user: InferSession["user"] | null;
  session: InferSession["session"] | null;
};

export const factory = createFactory<{ Variables: Variables }>({
  initApp: app => {
    app.use(
      "/api/auth/*",
      cors({
        origin: ["http://localhost:5173"],
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["POST", "GET", "OPTIONS"],
        exposeHeaders: ["Content-Length"],
        maxAge: 600,
        credentials: true,
      }),
    );

    app.use(async (c, next) => {
      const session = await auth.api.getSession({ headers: c.req.raw.headers });
      c.set("user", session?.user ?? null);
      c.set("session", session?.session ?? null);
      await next();
    });
  },
});
