import { type BetterAuthOptions, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";
import { prisma } from "./db";

const options = {
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    spotify: {
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      scope: [
        "user-read-email",
        "playlist-read-private",
        "playlist-read-collaborative",
        "user-read-private",
        "user-top-read",
        "user-library-read",
        "user-library-modify",
        "playlist-modify-public",
        "playlist-modify-private",
      ],
    },
  },
  user: {
    additionalFields: {
      accessToken: {
        type: "string",
        required: false,
      },
      refreshToken: {
        type: "string",
        required: false,
      },
      accountId: {
        type: "string",
        required: false,
      },
    },
  },
} as const satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...options,
  plugins: [
    customSession(async ({ user, session }) => {
      const record = await prisma.account.findFirst({
        where: { userId: session.userId },
        select: { accessToken: true, refreshToken: true, accountId: true },
      });
      return {
        user: {
          ...user,
          accountId: record?.accountId ?? undefined,
          accessToken: record?.accessToken ?? undefined,
          refreshToken: record?.refreshToken ?? undefined,
        },
        session,
      };
    }, options),
  ],
});
