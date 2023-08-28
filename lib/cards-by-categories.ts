import prisma from "./prisma";

export async function getCatSales(filter: string = "All") {
  let filterCriteria =
    filter === "All"
      ? {}
      : {
          nft: {
            item: {
              categories: {
                some: {
                  name: filter,
                },
              },
            },
          },
        };

  let recentSales = await prisma.sale.findMany({
    where: {
      ...filterCriteria,
    },
    take: 5,
    orderBy: {
      date: "desc",
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
