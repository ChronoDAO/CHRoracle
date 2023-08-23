import prisma from "./prisma";

export async function getSalesWithCategories() {
    try {
        const sales = await prisma.sale.findMany({
          orderBy: {
            date: "desc",
          },
          take: 2,
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
        console.dir(sales, { depth: null });
        console.log(sales[1].nft?.item?.categories)
    
    return sales
  
      
    } catch (error) {
      console.error("Error:", error);
    } finally {
      await prisma.$disconnect();
    }
  }
  