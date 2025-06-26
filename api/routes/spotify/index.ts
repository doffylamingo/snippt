import { Hono } from "hono";
import { playlistRoutes } from "./playlists";
import { profileRoutes } from "./profile";
import { tracksRoutes } from "./tracks";

export const spotifyRoutes = new Hono()
  .route("/playlists", playlistRoutes)
  .route("/profile", profileRoutes)
  .route("/tracks", tracksRoutes);
