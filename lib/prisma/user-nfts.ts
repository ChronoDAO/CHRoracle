import prisma from "./prisma";

export const getUserNFTs = async ({username}:{username : string }) => {
  console.log(username);
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
      purchases: { select: { id: true, date: true } },
      drops: { select: { id: true, date: true } },
    },
  });
  return (user);
};