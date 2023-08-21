import prisma from "./prisma";

export const mostExpensiveSales = async () => {
  const salesOrderedByPrice = await prisma.sale.findMany({
    take: 5,
    orderBy: {
      price: "desc",
    },
    include: {
      nft: {
        include: {
          item: {
            select: {
              name: true,
              imageUrl: true,
              rarityName: true,
            },
          },
        },
      },
    },
  });

  return {
    salesOrderedByPrice: salesOrderedByPrice,
  };
};
