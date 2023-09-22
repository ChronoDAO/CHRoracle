import prisma from "./prisma";

export const getPlayerHistory = async ({ playername }: { playername: string }) => {

  let player = await prisma.player.findFirst({
    where: {
      name: playername,
    },
    include: {
      nfts: {
        include: {
          item: true,
        },
      },
      purchases: {
        include: {
          nft: {
            include: {
              item: true,
            },
          },
        },
      },
      sales: {
        include: {
          nft: {
            include: {
              item: true,
            },
          },
        },
      },
      drops: {
        include: {
          nft: {
            include: {
              item: true,
            },
          },
        },
      },
    },
  });
  return player;
};
