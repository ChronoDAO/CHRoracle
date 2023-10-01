import prisma from '@/lib/prisma/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/prisma/auth';

export async function updateGuildData(session: any) {
  try {
    const session = await getServerSession(authOptions)
    const session_access_token = session?.user.access_token

    if (typeof session_access_token !== 'string') {
      throw new Error('Access token is not a string');
    }

    const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds?with_counts=true', {
      headers: {
        Authorization: `Bearer ${session_access_token}`,
      },
    });

    if (!guildsResponse.ok) { 
      throw new Error('Failed to fetch Discord guild data');
    }

    const guildsData = await guildsResponse.json();

    await Promise.all(
      guildsData.map(async (guild: any) => {
        // Upsert the DiscordGuild
        const discordGuild = await prisma.discordGuild.upsert({
          where: {
            name: guild.name,
          },
          update: {
            approximate_number_count: guild.approximate_member_count,
            approximate_presence_count: guild.approximate_presence_count,
            updatedAt: new Date(),
          },
          create: {
            id: guild.id,
            name: guild.name,
            icon: guild.icon,
            ownerId: guild.owner_id,
            approximate_number_count: guild.approximate_member_count,
            approximate_presence_count: guild.approximate_presence_count,
            description: guild.description,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });

        // Link the DiscordGuild to the User
        if (session?.user.email) {
          await prisma.user.update({
            where: { email: session.user.email },
            data: {
              discordGuild: {
                connect: { name: discordGuild.name },
              },
            },
          });
        }
      })
    );
    console.log('Guild data updated successfully');
      return { success: true, message: 'Discord data updated successfully' };
  } catch (error) {
    console.error('Error updating Discord data:', error);
    throw new Error('Error updating Discord data');
  }
}