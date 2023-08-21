import prisma from "./prisma";


export const salesByDay = async () => {
    const sales = await prisma.sale.findMany({
        orderBy: {
          date: "asc",
        },
      })

      const salesModifiedDate = sales.map((sale: { date: Date; price: number }) => {
        const date = sale.date;
  
        const day = date.getDate();
  
        const month = date.getMonth();
  
        const year = date.getFullYear();
  
        const dateYMD = new Date(Date.UTC(year, month, day));
  
        sale.date = dateYMD;
  
        return sale;
      });
      console.log(salesModifiedDate.length)
      console.log(salesModifiedDate)
  
      const aggregatedSales: { [key: string]: number } = {};
      let saleDate = salesModifiedDate[0].date
      let nextDay = new Date(saleDate);
      nextDay.setDate(saleDate.getDate() + 1);
      let totalSales = 0;
  
      for (let i = 0; i < salesModifiedDate.length; i++) {
        if (
          salesModifiedDate[i].date < nextDay 
        ) {
          totalSales += salesModifiedDate[i].price;
        } else  {
          aggregatedSales[saleDate.toISOString()] = totalSales;
          saleDate = salesModifiedDate[i].date;
          totalSales = salesModifiedDate[i].price;
  
          nextDay.setDate(saleDate.getDate() + 1);    
        }
      }
  
  aggregatedSales[saleDate.toISOString()] = totalSales;

  return aggregatedSales;
};
