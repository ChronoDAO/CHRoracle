import prisma from './prisma'

export const lastSales = async() => {
    const lastSales = await prisma.sale.findMany({
        take: 5,
        orderBy: {
          id: 'desc',
        },
        include: {
          nft: {
              include: {
                  item: {
                      select:{
                          name: true,
                          imageUrl: true,
                          rarityName: true,
                      }
                  }
              }
          }
        }
      })
      return lastSales
}