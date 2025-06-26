import { Hono } from "hono";
import { playlistRoutes } from "./playlists";

export const spotifyRoutes = new Hono().route("/playlists", playlistRoutes);
