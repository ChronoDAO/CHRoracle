import { getSales } from "@/lib/prisma/recent-sales";
import { getSalesByDay } from "@/lib/prisma/sales-by-day";
import { getLast24hSales } from "@/lib/sales-last-24h";
import RecentSales from "@/components/RecentSales/RecentSales";
import Sales from "@/components/Sales/Sales";



export default async function Dashboard() {
  let recentSales = await getSales();
  let salesByDay = await getSalesByDay();
  let last24hsales = await getLast24hSales("2023-06-25T02:00:00.000Z");

  return (
   
    <>
      {/* @ts-ignore */}
      <RecentSales data={recentSales} />

      <Sales data={salesByDay} data24h={last24hsales}/>

      
    </>
  );
}
