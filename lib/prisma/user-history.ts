import prisma from "./prisma";

export const getUserHistory = async ({ username }: { username: string }) => {
  console.log(`getUserHistory en cours`);
  let user = await prisma.user.findFirst({
    where: {
      name: username,
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
  return user;
};
