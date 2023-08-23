import prisma from "./prisma";

export async function getSalesWithCategories() {
    try {
        const sales = await prisma.sale.findMany({
          orderBy: {
            date: "desc",
          },
          take: 10,
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
     
        const objectType = Array.isArray(sales)
        console.log(objectType)
    return sales
  
      
    } catch (error) {
      console.error("Error:", error);
    } finally {
      await prisma.$disconnect();
    }
  }
  