import { EntityCanvazRequest } from "@generated/proto/canvas";
import { authenticator } from "otplib";
import { prisma } from "../db";

class SpotifyTokenManager {
  private static instance: SpotifyTokenManager;
  private memoryCache: { token: string; expiresAt: Date } | null = null;
  private USER_AGENT = this.getRandomUserAgent();

  private constructor() {}

  static getInstance(): SpotifyTokenManager {
    if (!SpotifyTokenManager.instance) {
      SpotifyTokenManager.instance = new SpotifyTokenManager();
    }
    return SpotifyTokenManager.instance;
  }

  async getAccessToken(): Promise<string> {
    if (this.memoryCache && this.memoryCache.expiresAt > new Date()) {
      return this.memoryCache.token;
    }

    const dbToken = await prisma.spotifyToken.findFirst({
      where: {
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (dbToken) {
      this.memoryCache = {
        token: dbToken.token,
        expiresAt: dbToken.expiresAt,
      };
      return dbToken.token;
    }

    const newToken = await this.fetchNewToken();

    return newToken;
  }

  private getRandomUserAgent() {
    const macOSVersion = `${Math.floor(Math.random() * 4) + 11}_${Math.floor(Math.random() * 5) + 4}`;
    const webKitVersion = `${Math.floor(Math.random() * 7) + 530}.${Math.floor(Math.random() * 7) + 30}`;
    const chromeVersion = `${Math.floor(Math.random() * 25) + 80}.0.${Math.floor(Math.random() * 1500) + 3000}.${Math.floor(Math.random() * 65) + 60}`;
    const safariVersion = `${Math.floor(Math.random() * 7) + 530}.${Math.floor(Math.random() * 6) + 30}`;

    return `Mozilla/5.0 (Macintosh; Intel Mac OS X ${macOSVersion}) AppleWebKit/${webKitVersion} (KHTML, like Gecko) Chrome/${chromeVersion} Safari/${safariVersion}`;
  }

  generateTOTP(timestamp: number): string {
    const SECRET_STRING = "GU2TANZRGQ2TQNJTGQ4DONBZHE2TSMRSGQ4DMMZQGMZDSMZUG4";
    authenticator.options = { epoch: timestamp };
    return authenticator.generate(SECRET_STRING);
  }

  private async getSpotifyServerTime(spdc: string) {
    const res = await fetch("https://open.spotify.com/api/server-time", {
      method: "GET",
      headers: {
        "User-Agent": this.USER_AGENT,
        Cookie: `sp_dc=${spdc}`,
      },
    });

    const data = await res.json();

    return data.serverTime;
  }

  private async fetchNewToken(): Promise<string> {
    const spdc = process.env.SPOTIFY_SPDC ?? "";
    const serverTime = await this.getSpotifyServerTime(spdc);
    const totp = this.generateTOTP(serverTime * 1000);

    const res = await fetch(
      `https://open.spotify.com/api/token?reason=init&productType=web-player&totp=${totp}&totpServer=${totp}&totpVer=7`,
      {
        headers: {
          "User-Agent": this.USER_AGENT,
          Cookie: `sp_dc=${spdc};`,
        },
      },
    );

    const data = await res.json();

    const expiresAt = new Date(
      data.accessTokenExpirationTimestampMs - 5 * 60 * 1000,
    );

    await prisma.spotifyToken.create({
      data: {
        token: data.accessToken,
        expiresAt,
      },
    });
    this.memoryCache = {
      token: data.accessToken,
      expiresAt,
    };

    await prisma.spotifyToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    return data.accessToken;
  }
}

const tokenManager = SpotifyTokenManager.getInstance();

function encodeRequest(trackIds: string[]) {
  const entities = trackIds.map(trackId => ({ entityUri: trackId }));

  return EntityCanvazRequest.toBinary(
    EntityCanvazRequest.create({
      entities,
    }),
  );
}

export interface CanvasResponse {
  canvases: Canvas[];
  ttlInSeconds: string;
}

export interface Canvas {
  id: string;
  url: string;
  fileId: string;
  type: string;
  entityUri: string;
  artist: Artist;
  explicit: boolean;
  uploadedBy: string;
  etag: string;
  canvasUri: string;
  storylinesId: string;
  thumbnails: Thumbnail[];
}

export interface Artist {
  uri: string;
  name: string;
  image: string;
}

export interface Thumbnail {
  height: number;
  width: number;
  publicUrl: string;
}

export async function getCanvasURL(trackIds: string[]) {
  const token = await tokenManager.getAccessToken();

  const res = await fetch(
    "https://spclient.wg.spotify.com/canvaz-cache/v0/canvases",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      body: encodeRequest(trackIds),
    },
  );

  const canvasResponse = (await res.json()) as CanvasResponse;

  if (!canvasResponse.canvases || canvasResponse.canvases.length === 0) {
    return [];
  }

  return canvasResponse.canvases;
}
