import prisma from "./prisma";

export const getOwnersGroupedByOwners = async (archetypeId) => {
  const ownersGrouped = await prisma.nFT.groupBy({
    by: ["ownerName"],
    where: {
      archetypeId: archetypeId,
    },
    _count: {
      ownerName: true,
    },
  });

  return ownersGrouped;
};
