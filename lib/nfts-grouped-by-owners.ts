import prisma from "./prisma";

export const getOwnersGroupedByOwners = async ({archetypeid}:{archetypeid: string}) => {
  const ownersGrouped = await prisma.nFT.groupBy({
    by: ["ownerName"],
    where: {
      archetypeId: archetypeid,
    },
    _count: {
      ownerName: true,
    },
  });

  return ownersGrouped;
};
