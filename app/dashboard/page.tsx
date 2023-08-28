import { getSalesByDay } from "@/lib/prisma/sales-by-day";
import { getLast24hSales } from "@/lib/sales-last-24h";
import Sales from "@/components/Sales/Sales";
import {getNftItem } from "@/lib/sales-with-nft-info"
import RecentSalesByCategory from '@/components/RecentSalesByCategory/RecentSalesByCategory'
import { getCategories } from "@/lib/categories";

export default async function Dashboard() {

  let salesByDay = await getSalesByDay();
  let last24hsales = await getLast24hSales("2023-06-25T02:00:00.000Z");
  let sales= await getNftItem()
  let categories = await getCategories()


  return (
   
    <>
      {/* @ts-ignore */}

      <RecentSalesByCategory data={sales} categories = {categories}/>

      <Sales data={salesByDay} data24h={last24hsales}/>

      
    </>
  );
}
