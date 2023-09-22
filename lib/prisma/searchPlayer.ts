import prisma from "./prisma";

export default async function searchPlayer(searchQuery:string) {
  try {
    const players = await prisma.player.findMany({
      where: {
        name: {
          contains: searchQuery, // Use 'contains' for partial string matching
        },
      },
    });

    return players;
  } catch (error:any) {
    console.error(`Error fetching players by name: ${error.message}`);
    throw error;
  }
}


