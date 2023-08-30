import NextAuth, { NextAuthOptions } from "next-auth"

import DiscordProvider from "next-auth/providers/discord"

export const authConfig: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
}

export default NextAuth(authConfig)