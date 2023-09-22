import prisma from "./prisma";

export async function getSalesByMinutes( string: string) {
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

    const salesModifiedDate = sales.map((sale) => {
      const date = sale.date;
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const utcDateYMDHM = new Date(Date.UTC(year, month, day, hour, minutes)); 
      sale.date = utcDateYMDHM;  
      return sale;
    });

    const aggregatedSales = [];
    let saleDate = salesModifiedDate[0].date
    let saleDayMinutes =( (salesModifiedDate[0].date.getHours()* 60) + salesModifiedDate[0].date.getMinutes());
    let nextMinute = saleDayMinutes + 1
    let totalSales = 0;
    let objectFormat = {}

    for (let i = 0; i < salesModifiedDate.length; i++) {
      let dayMinutes = ( (salesModifiedDate[i].date.getHours()* 60) + salesModifiedDate[i].date.getMinutes());
      if (
          dayMinutes < nextMinute
      ) {
        totalSales += salesModifiedDate[i].price;
      } else  {
        objectFormat = {
          date: saleDate.getTime(),
          value: totalSales,
        }
        aggregatedSales.push(objectFormat)
        saleDate = salesModifiedDate[i].date;
        saleDayMinutes = dayMinutes
        nextMinute = saleDayMinutes + 1  
        totalSales = salesModifiedDate[i].price;
      }
    }

    objectFormat = {
      date: saleDate.getTime(),
      value: totalSales,
    };
    aggregatedSales.push(objectFormat);

  return aggregatedSales
  } catch (error) {
    console.error("Error:", error);
  }
}