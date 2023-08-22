import prisma from "./prisma";

export const getSalesByDay = async () => {
    const sales = await prisma.sale.findMany({
        take: 10,
        orderBy: {
          date: "asc",
        },
      });
   
  
      const salesModifiedDate = sales.map((sale) => {
        const date = sale.date;

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const dateYMD = new Date(Date.UTC(year, month, day));

        sale.date = dateYMD;
  
        return sale;
    });
  
      const aggregatedSales = [];
      let saleDate = salesModifiedDate[0].date
      let nextDay = new Date(saleDate);
      nextDay.setDate(saleDate.getDate() + 1);
      let totalSales = 0;
      let objectFormat = {}
      for (let i = 0; i < salesModifiedDate.length; i++) {
        if (
          salesModifiedDate[i].date < nextDay 
        ) {
          totalSales += salesModifiedDate[i].price;
        } else  {
          objectFormat = {
            date: saleDate.toISOString(),
            value: totalSales,
          }
          aggregatedSales.push(objectFormat)
          saleDate = salesModifiedDate[i].date;
          totalSales = salesModifiedDate[i].price;
  
          nextDay.setDate(saleDate.getDate() + 1);    
        }
      }
  
      objectFormat = {
        date: saleDate.toISOString(),
        value: totalSales,
    };
    aggregatedSales.push(objectFormat);

  return aggregatedSales;
};
