import {getSales} from '@/lib/recent-sales';
import {getSalesByDay} from '@/lib/sales-by-day';
import RecentSales from '@/components/RecentSales/RecentSales';
import SalesByDay from '@/components/salesByDay/salesByDay';

export default async function Dashboard() {
  let recentSales = await getSales();
  let salesByDay = await getSalesByDay()

  return (
    <>
  
    {/* @ts-ignore */}
      <RecentSales data={ recentSales }  />
      <SalesByDay data= {salesByDay}/>
    </>
  )

}
