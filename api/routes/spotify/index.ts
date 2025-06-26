import { Hono } from "hono";
import { playlistRoutes } from "./playlists";
import { profileRoutes } from "./profile";

export const spotifyRoutes = new Hono()
  .route("/playlists", playlistRoutes)
  .route("/profile", profileRoutes);
