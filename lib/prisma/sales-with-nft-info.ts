import prisma from "./prisma";

export async function getNftItem() {
    try {
        const sales = await prisma.sale.findMany({
          orderBy: {
            date: "desc",
          },
          take: 100,
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
            item: {
              name: sale.nft?.item?.name,
              imageUrl: sale.nft?.item?.imageUrl,
              rarityName: sale.nft?.item?.rarityName,
              categories: sale.nft?.item?.categories.map(category => category.name),
            }     
          },
        };
  
        salesNFTitem.push(newSaleObject);
      }
  
      return salesNFTitem
      
    } catch (error) {
      console.error("Error:", error);
    } finally {
      await prisma.$disconnect();
    }
  }