import { getSales } from "@/lib/recent-sales";
import { getSalesByDay } from "@/lib/sales-by-day";
import { getLast24hSales } from "@/lib/sales-last-24h";
import RecentSales from "@/components/RecentSales/RecentSales";
import Sales from "@/components/Sales/Sales";
import {getNftItem } from "@/lib/sales-with-nft-info"
import LatestSalesByCategory from '@/components/LatestSalesByCategory/LatestSalesByCategory'
import { getCategories } from "@/lib/categories";



export default async function Dashboard() {
  let recentSales = await getSales();
  let salesByDay = await getSalesByDay();
  let last24hsales = await getLast24hSales("2023-06-25T02:00:00.000Z");
  let sales= await getNftItem()
  let categories = await getCategories()


  return (
   
    <>
      {/* @ts-ignore */}
      <RecentSales data={recentSales} />

      <LatestSalesByCategory data={sales} categories = {categories}/>

      <Sales data={salesByDay} data24h={last24hsales}/>

      
    </>
  );
}
