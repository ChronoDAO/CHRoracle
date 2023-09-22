import prisma from "./prisma";

export async function getSales() {
  let recentSales = await prisma.sale.findMany({
    take: 5,
    orderBy: {
      date: 'desc',
    },
    include: {
      nft: {
        include: {
          item: true,
        },
      },
    },
  });
  return recentSales;
}
