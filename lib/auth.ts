import NextAuth, { NextAuthOptions, getServerSession } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { redirect } from "next/navigation"
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/router"

export const authConfig: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
}


export async function loginIsRequiredServer () {
  const session = await getServerSession(authConfig)
  if (!session) return redirect("/")
}

// export function loginIsRequiredClient () {
//   if ( typeof window !== "undefined") {
//     const session = useSession()
//     const router = useRouter()
//     if (!session) router.push("/");
//   }
// }

export default NextAuth(authConfig)