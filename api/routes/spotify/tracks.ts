import { zValidator } from "@hono/zod-validator";
import type { SavedTracksResponse } from "@shared/types/spotify";
import { Hono } from "hono";
import { z } from "zod";
import { baseSpotifyFetch } from "@/utils/spotify";

export const tracksRoutes = new Hono()
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        limit: z.number().optional().default(50),
        offset: z.number().optional().default(0),
      }),
    ),
    async c => {
      const { limit, offset } = c.req.valid("json");

      const data = await baseSpotifyFetch<SavedTracksResponse>(
        c,
        `me/tracks?limit=${limit}&offset=${offset}`,
      );

      return c.json(data);
    },
  )
  .post(
    "/like",
    zValidator(
      "json",
      z.object({
        id: z.string(),
      }),
    ),
    async c => {
      const { id } = c.req.valid("json");

      await baseSpotifyFetch(c, "me/tracks", "PUT", {
        ids: [id],
      });

      c.status(204);
      return c.json({ message: "Liked" });
    },
  )
  .post(
    "/unlike",
    zValidator(
      "json",
      z.object({
        id: z.string(),
      }),
    ),
    async c => {
      const { id } = c.req.valid("json");

      await baseSpotifyFetch(c, "me/tracks", "DELETE", {
        ids: [id],
      });

      c.status(204);
      return c.json({ message: "Unliked" });
    },
  );
