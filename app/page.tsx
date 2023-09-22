import { getSalesByDay } from "@/lib/prisma/sales-by-day";
import { getLast24hSales } from "@/lib/prisma/sales-last-24h";
import Sales from "@/components/Sales/Sales";
import {getSalesByCategory } from "@/lib/prisma/sales-with-nft-info"
import RecentSalesByCategory from '@/components/RecentSalesByCategory/RecentSalesByCategory'
import { getTags } from "@/lib/prisma/tags";

export default async function Home() {

  let salesByDay = await getSalesByDay();
  let last24hsales = await getLast24hSales("2023-06-25T02:00:00.000Z");
  let transformedSales = await getSalesByCategory()
  let tags = await getTags()

  return (
    <>
      {/* @ts-ignore */}
      <RecentSalesByCategory data={transformedSales} tags = {tags}/>
      <Sales data={salesByDay} data24h={last24hsales}/>
    </>
  );
}
