import prisma from "./prisma";

export async function getLastSales( string: string) {
  try {
    const startDate = new Date(string);
  
    const finishDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); 

    const sales = await prisma.sale.findMany({
      orderBy: {
        date: "asc",
      },
      where: {
        date: {
          gt: startDate,
          lt: finishDate, 
        },
      },
    });
    console.log(startDate)
   console.log(finishDate)

    const salesModifiedDate = sales.map((sale) => {
        const date = sale.date;
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hour = date.getHours();
        const utcDateYMDH = new Date(Date.UTC(year, month, day, hour)); 
        sale.date = utcDateYMDH;  
        return sale;
      });
   
      const aggregatedSales = [];
      let saleDate = salesModifiedDate[0].date
      let saleHour = salesModifiedDate[0].date.getHours();
      let nextHour = saleHour + 1
    
      let totalSales = 0;
      let objectFormat = {}

      for (let i = 0; i < salesModifiedDate.length; i++) {
        if (
          salesModifiedDate[i].date.getHours() < nextHour
        ) {
          totalSales += salesModifiedDate[i].price;
        } else  {
          objectFormat = {
            date: saleDate.toISOString(),
            value: totalSales,
          }
          aggregatedSales.push(objectFormat)
          saleDate = salesModifiedDate[i].date;
          saleHour = salesModifiedDate[i].date.getHours();
          nextHour = saleHour + 1  
          totalSales = salesModifiedDate[i].price;
  
           
        }
      }
  
      objectFormat = {
        date: saleDate.toISOString(),
        value: totalSales,
    };
    aggregatedSales.push(objectFormat);

  console.log(aggregatedSales);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}