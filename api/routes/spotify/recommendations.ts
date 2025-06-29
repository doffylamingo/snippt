import { zValidator } from "@hono/zod-validator";
import type {
  ArtistsResponse,
  RecommendationsResponse,
} from "@shared/types/spotify";
import { Hono } from "hono";
import { z } from "zod";
import { getGenericAccessToken } from "@/lib/scraper/get-generic-access-token";
import { getCanvasURL } from "@/lib/scraper/get-spotify-canvas";
import { getSpotifyPreviewUrl } from "@/lib/scraper/get-track-preview-url";
import { baseSpotifyFetch, genericSpotifyFetch } from "@/utils/spotify";

export const recommendationsRoutes = new Hono().post(
  "/",
  zValidator(
    "json",
    z
      .object({
        limit: z.number().optional().default(20),
      })
      .merge(
        z
          .object({
            seed_artists: z.string().optional(),
            seed_genres: z.string().optional(),
            seed_tracks: z.string().optional(),
          })
          .refine(
            data => data.seed_artists || data.seed_genres || data.seed_tracks,
            {
              message: "At least one seed type is required",
            },
          )
          .innerType(),
      )
      .merge(
        z
          .object({
            min_acousticness: z.number().optional(),
            max_acousticness: z.number().optional(),
            target_acousticness: z.number().optional(),
            min_danceability: z.number().optional(),
            max_danceability: z.number().optional(),
            target_danceability: z.number().optional(),
            min_duration_ms: z.number().optional(),
            max_duration_ms: z.number().optional(),
            target_duration_ms: z.number().optional(),
            min_energy: z.number().optional(),
            max_energy: z.number().optional(),
            target_energy: z.number().optional(),
            min_instrumentalness: z.number().optional(),
            max_instrumentalness: z.number().optional(),
            target_instrumentalness: z.number().optional(),
            min_key: z.number().optional(),
            max_key: z.number().optional(),
            target_key: z.number().optional(),
            min_liveness: z.number().optional(),
            max_liveness: z.number().optional(),
            target_liveness: z.number().optional(),
            min_loudness: z.number().optional(),
            max_loudness: z.number().optional(),
            target_loudness: z.number().optional(),
            min_mode: z.number().optional(),
            max_mode: z.number().optional(),
            target_mode: z.number().optional(),
            min_popularity: z.number().optional(),
            max_popularity: z.number().optional(),
            target_popularity: z.number().optional(),
            min_speechiness: z.number().optional(),
            max_speechiness: z.number().optional(),
            target_speechiness: z.number().optional(),
            min_tempo: z.number().optional(),
            max_tempo: z.number().optional(),
            target_tempo: z.number().optional(),
            min_time_signature: z.number().optional(),
            max_time_signature: z.number().optional(),
            target_time_signature: z.number().optional(),
            min_valence: z.number().optional(),
            max_valence: z.number().optional(),
            target_valence: z.number().optional(),
          })
          .partial(),
      ),
  ),
  async c => {
    const { limit, seed_artists, seed_genres, seed_tracks, ...filters } =
      c.req.valid("json");

    const params = new URLSearchParams();

    if (limit) params.set("limit", String(limit));

    if (seed_artists) params.set("seed_artists", seed_artists);
    else if (seed_genres) params.set("seed_genres", seed_genres);
    else if (seed_tracks) params.set("seed_tracks", seed_tracks);

    Object.entries(filters).forEach(([k, v]) => {
      if (v != null) params.set(k, String(v));
    });

    const token = await getGenericAccessToken();

    const recommendation = await genericSpotifyFetch<RecommendationsResponse>(
      token,
      `recommendations?${params.toString()}`,
    );

    const trackIds = recommendation.tracks.map(t => t.id).join(",");
    const artistIds = recommendation.tracks.map(t => t.artists[0].id).join(",");
    const canvasUris = recommendation.tracks.map(t => `spotify:track:${t.id}`);

    const [likes, artists, canvases] = await Promise.all([
      baseSpotifyFetch<boolean[]>(
        c,
        `me/tracks/contains?ids=${trackIds}`,
        "GET",
      ),
      genericSpotifyFetch<ArtistsResponse>(
        token,
        `artists?ids=${artistIds}`,
        "GET",
      ),
      getCanvasURL(canvasUris),
    ]);

    const follows = await baseSpotifyFetch<boolean[]>(
      c,
      `me/following/contains?type=artist&ids=${artists.artists.map(a => a.id).join(",")}`,
      "GET",
    );

    const tracks = recommendation.tracks.map(async (track, index) => {
      const previewUrl =
        track.preview_url ?? (await getSpotifyPreviewUrl(track.id));

      return {
        track: {
          id: track.id,
          name: track.name,
          duration_ms: track.duration_ms,
          preview_url: previewUrl,
          canvas_url:
            canvases.find(
              canvas => canvas.entityUri === `spotify:track:${track.id}`,
            )?.url ?? null,
        },
        artist: {
          id: track.artists[0].id,
          name: track.artists[0].name,
          genres: artists.artists[index].genres,
          followers: formatNumber(artists.artists[index].followers?.total ?? 0),
          image: artists.artists[index].images[0]?.url,
        },
        album: {
          cover: track.album.images[0].url,
          id: track.album.id,
          name: track.album.name,
          release_date: track.album.release_date,
          total_tracks: track.album.total_tracks,
          type: track.album.album_type,
        },
        liked: likes[index],
        isFollowing: follows[index],
      };
    });

    const data = await Promise.all(tracks);

    return c.json(data);
  },
);

const formatNumber = (input: number) => {
  let value = input;
  const suffixes = ["", "K", "M", "B", "T"];
  let suffixIndex = 0;

  while (value >= 1000 && suffixIndex < suffixes.length - 1) {
    value /= 1000;
    suffixIndex++;
  }

  return value.toFixed(1) + suffixes[suffixIndex];
};
