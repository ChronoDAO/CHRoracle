import prisma from "./prisma";

export async function getSalesByCategory() {
  try {
    const tags = await prisma.tag.findMany()
    const sales = await prisma.sale.findMany({
      orderBy: {
        date: "desc",
      },
      take: 32000,
      include: {
        nft: {
          include: {
            item: {
              include: {
                tags: true,
              },
            },
          },
        },
      },
    });

    //first sales
    let filteredSalesByCategory= [];
    let firstFiveSales = sales.slice(0,5)
    filteredSalesByCategory.push(firstFiveSales);

    for (let i = 0; i < tags.length; i++) {
      const tagName: string = tags[i].name;
      const salesInCategory = sales.filter(sale =>
        sale.nft?.item?.tags.some(tag => tag.name === tagName)
      );
      const firstFiveSales = salesInCategory.slice(0,5)
      filteredSalesByCategory.push(firstFiveSales);
    }

    let transformedSales = []
    for (let i = 0; i < sales.length; i++) {
      const sale = sales[i];

      const newSaleObject = {
        id: sale.id,
        price: sale.price,
        date: sale.date,
        fromPlayer: sale.fromPlayer,
        toPlayer: sale.toPlayer,
        nft: {
          issuedId: sale.nft?.issuedId,
          item: {
            name: sale.nft?.item?.name,
            imageUrl: sale.nft?.item?.imageUrl,
            rarityName: sale.nft?.item?.rarityName,
            tags: sale.nft?.item?.tags.map(tag => tag.name),
          }
        },
      };
    transformedSales.push(newSaleObject);
    }

    return transformedSales

  } catch (error) {
    console.error("Error:", error);
  }
}