import styles from './dashboard.module.scss'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/prisma/auth';
import { updateGuildData } from '../api/discord/fetchDiscordGuildFromUser';
import { differenceInDays } from "date-fns";
import prisma from '@/lib/prisma/prisma';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const email:any = user?.email

  const userWithGuilds = await prisma.user.findUnique({
    where: { email: email },
    include: {
      discordGuild: {
        select: {
          updatedAt: true, // Include updatedAt field from DiscordGuild
        },
      },
    },
  });

  if (!userWithGuilds || userWithGuilds.discordGuild.length === 0) {
    console.log("No DiscordGuilds found. Creating and fetching new data...");
    // Create guilds and fetch new data
    if (user && typeof user.access_token === "string") {
      try {
        await updateGuildData(user.access_token);
      } catch (error) {
        console.error("Error creating and fetching Discord data:", error);
        // Handle error
      }
    }
  } else if (
    userWithGuilds.discordGuild.some((guild) => {
      const daysDifference = differenceInDays(new Date(), guild.updatedAt);
      console.log(daysDifference)
      return daysDifference > 7;
    })
  ) {
    console.log("Some DiscordGuilds to be updated. Fetching new data...",);
    // Fetch new guild data
    if (user && typeof user.access_token === "string") {
      try {
        await updateGuildData(user.access_token);
      } catch (error) {
        console.error("Error updating Discord data:", error);
        // Handle error
      }
    }
  } else {
    console.log("All DiscordGuilds up to date. No fetch needed.");
  }


  return (
    <div className={styles["center-title"]}>
      <h1>Welcome, {user?.global_name}</h1>
      <h1>Work in Progress </h1>
    </div>
  )
}