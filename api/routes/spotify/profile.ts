import { zValidator } from "@hono/zod-validator";
import type {
  FollowingArtistsResponse,
  TopArtistsResponse,
  TopTracksResponse,
  User,
} from "@shared/types/spotify";
import { Hono } from "hono";
import { z } from "zod";
import type { Variables } from "@/app";
import { baseSpotifyFetch } from "@/utils/spotify";

export const profileRoutes = new Hono<{ Variables: Variables }>()
  .get("/", async c => {
    const data = await baseSpotifyFetch<User>(c, "me");
    return c.json(data);
  })
  .post(
    "/following",
    zValidator(
      "json",
      z.object({
        limit: z.number().optional().default(50),
        after: z.string().optional(),
      }),
    ),
    async c => {
      const { limit, after } = c.req.valid("json");

      const data = await baseSpotifyFetch<FollowingArtistsResponse>(
        c,
        `me/following?type=artist&limit=${limit}&after=${after ?? ""}`,
      );

      return c.json(data);
    },
  )
  .post(
    "/top",
    zValidator(
      "json",
      z.object({
        type: z.enum(["artists", "tracks"]).optional().default("tracks"),
        timeRange: z
          .enum(["long_term", "medium_term", "short_term"])
          .optional()
          .default("medium_term"),
        limit: z.number().optional().default(50),
        offset: z.number().optional().default(0),
      }),
    ),
    async c => {
      const { type, timeRange, limit, offset } = c.req.valid("json");

      const data = await baseSpotifyFetch<
        TopTracksResponse | TopArtistsResponse
      >(
        c,
        `me/top/${type}?time_range=${timeRange}&limit=${limit}&offset=${offset}`,
      );

      return c.json(data);
    },
  );
