import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function searchItems(query: string, archetypeid?: string) {
  // Si archetypeid est spécifié, recherchez des éléments basés sur cet ID
  if (archetypeid) {
    return await prisma.item.findMany({
      where: {
        archetypeId: archetypeid,
      },
      include: {
        nfts: true,
      },
    });
  }

  // Sinon, utilisez la recherche normale basée sur le mot-clé query
  return await prisma.item.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive", // pour une recherche insensible à la casse
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });
}
