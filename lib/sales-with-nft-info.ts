import prisma from "./prisma";

export async function getNftItem() {
    try {
        const categories = await prisma.category.findMany()
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
        let salesNFTitem = [];
  
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
            itemName: sale.nft?.item?.name,
            imageUrl: sale.nft?.item?.imageUrl,
            rarityName: sale.nft?.item?.rarityName,
            categories: sale.nft?.item?.categories.map(category => category.name),
          },
        };
  
        salesNFTitem.push(newSaleObject);
      }
  
      return {
        sales: salesNFTitem,
        categories: categories,
      };
  
      
    } catch (error) {
      console.error("Error:", error);
    } finally {
      await prisma.$disconnect();
    }
  }