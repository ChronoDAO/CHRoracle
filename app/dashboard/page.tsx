import { getSales } from "@/lib/recent-sales";
import { getSalesByDay } from "@/lib/sales-by-day";
import { getLast24hSales } from "@/lib/sales-last-24h";
import RecentSales from "@/components/RecentSales/RecentSales";
import SalesByDay from "@/components/salesByDay/salesByDay";


export default async function Dashboard() {
  let recentSales = await getSales();
  let salesByDay = await getSalesByDay();
  let last24hsales = await getLast24hSales("2023-06-25T02:00:00.000Z");

  return (
    <>
      {/* @ts-ignore */}
      <RecentSales data={recentSales} />
      <SalesByDay data={salesByDay} data24h={last24hsales} />
    </>
  );
}
