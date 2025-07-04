import type { Context } from "hono";
import { prisma } from "@/lib/db";

async function refreshSpotifyToken(oldRefreshToken: string) {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: oldRefreshToken,
    }),
  });
  const data = await res.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? oldRefreshToken,
    expiresIn: data.expires_in as number,
  };
}

async function spotifyRawFetch<T>(
  token: string,
  endpoint: string,
  method: string,
  body?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) throw new Error(`Spotify API request failed: ${res.statusText}`);
  return res.json() as Promise<T>;
}

export async function baseSpotifyFetch<T>(
  context: Context,
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: Record<string, unknown>,
): Promise<T> {
  const user = context.get("user");

  if (!user || !user.id) {
    throw new Error("Cannot fetch playlists: user ID missing");
  }

  const userId = user.id;

  const acc = await prisma.account.findFirst({
    where: { userId },
    select: {
      id: true,
      accessToken: true,
      refreshToken: true,
      accessTokenExpiresAt: true,
    },
  });
  if (!acc) throw new Error("Not logged in with Spotify");

  let { id, accessToken, refreshToken, accessTokenExpiresAt } = acc;

  if (!accessTokenExpiresAt || Date.now() >= accessTokenExpiresAt.getTime()) {
    if (!refreshToken) throw new Error("Missing refresh token for Spotify");

    const updated = await refreshSpotifyToken(refreshToken);

    await prisma.account.update({
      where: { id },
      data: {
        accessToken: updated.accessToken,
        refreshToken: updated.refreshToken,
        accessTokenExpiresAt: new Date(Date.now() + updated.expiresIn * 1000),
      },
    });
    accessToken = updated.accessToken;
  }

  return spotifyRawFetch<T>(accessToken ?? "", endpoint, method, body);
}

export async function genericSpotifyFetch<T>(
  token: string,
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: Record<string, unknown>,
): Promise<T> {
  return spotifyRawFetch<T>(token, endpoint, method, body);
}
