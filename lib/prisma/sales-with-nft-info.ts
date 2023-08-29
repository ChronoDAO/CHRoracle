import prisma from "./prisma";

export async function getSalesByCategory() {
  try {
      const categories = await prisma.category.findMany()
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
                  categories: true,
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

      for (let i = 0; i < categories.length; i++) {
        const categoryName: string = categories[i].name;
        const salesInCategory = sales.filter(sale =>
          sale.nft?.item?.categories.some(category => category.name === categoryName)
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
          fromUser: sale.fromUser,
          toUser: sale.toUser,
          nft: {
            issuedId: sale.nft?.issuedId,
            item: {
              name: sale.nft?.item?.name,
              imageUrl: sale.nft?.item?.imageUrl,
              rarityName: sale.nft?.item?.rarityName,
              categories: sale.nft?.item?.categories.map(category => category.name),
            }     
          },
        };
  
        transformedSales.push(newSaleObject);
      }
  
      return transformedSales
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}