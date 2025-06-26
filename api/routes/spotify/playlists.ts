import { zValidator } from "@hono/zod-validator";
import type {
  PlaylistAddRemoveTracksResponse,
  PlaylistCreateResponse,
  PlaylistResponse,
} from "@shared/types/spotify";
import { Hono } from "hono";
import { z } from "zod";
import { baseSpotifyFetch } from "@/utils/spotify";

export const playlistRoutes = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        limit: z.string().optional().default("50"),
      }),
    ),
    async c => {
      const { limit } = c.req.valid("query");

      const data = await baseSpotifyFetch<PlaylistResponse>(
        c,
        `me/playlists?limit=${limit}`,
      );

      return c.json(data);
    },
  )
  .post(
    "/tracks/add",
    zValidator(
      "json",
      z.object({
        playlistId: z.string(),
        uris: z.array(z.string()),
      }),
    ),
    async c => {
      const body = c.req.valid("json");

      const { playlistId, ...payload } = body;

      const data = await baseSpotifyFetch<PlaylistAddRemoveTracksResponse>(
        c,
        `playlists/${playlistId}/tracks`,
        "POST",
        payload,
      );

      return c.json(data);
    },
  )
  .post(
    "/tracks/remove",
    zValidator(
      "json",
      z.object({
        playlistId: z.string(),
        uris: z.array(z.string()),
      }),
    ),
    async c => {
      const body = c.req.valid("json");

      const { playlistId, ...payload } = body;

      const tracks = payload.uris.map(uri => ({ uri }));

      const data = await baseSpotifyFetch<PlaylistAddRemoveTracksResponse>(
        c,
        `playlists/${playlistId}/tracks`,
        "DELETE",
        { tracks },
      );

      return c.json(data);
    },
  )
  .post(
    "/create",
    zValidator(
      "json",
      z.object({
        userId: z.string(),
        name: z.string(),
        description: z.string().optional(),
        public: z.boolean().optional().default(true),
        collaborative: z.boolean().optional().default(false),
      }),
    ),
    async c => {
      const body = c.req.valid("json");

      const { userId, ...payload } = body;

      const data = await baseSpotifyFetch<PlaylistCreateResponse>(
        c,
        `users/${userId}/playlists`,
        "POST",
        payload,
      );

      return c.json(data);
    },
  );
