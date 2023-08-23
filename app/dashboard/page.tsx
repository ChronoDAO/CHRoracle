import { getSales } from "@/lib/recent-sales";
import { getSalesByDay } from "@/lib/sales-by-day";
import { getLastSales } from "@/lib/sales-last-24h";
import RecentSales from "@/components/RecentSales/RecentSales";
import SalesByDay from "@/components/salesByDay/salesByDay";
import OptionalSalesStats from "@/components/OptionalSalesStats/OptionalSalesStats";
import Test from '@/components/Test/Test';
import { getSalesWithCategories } from "@/lib/sales-categories";

export default async function Dashboard() {
  let recentSales = await getSales();
  let salesByDay = await getSalesByDay();
  let last24hsales = await getLastSales("2023-06-25T02:00:00.000Z");
  let salesWithCategories = getSalesWithCategories()

  return (
    <>
      {/* @ts-ignore */}
      <RecentSales data={recentSales} />
      <SalesByDay data={salesByDay} />
      <OptionalSalesStats data={last24hsales} />
      <Test data= {salesWithCategories[0]}/>
    </>
  );
}
