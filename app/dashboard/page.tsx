
import RecentSales from '../../components/RecentSales/RecentSales';
import prisma from "../../lib/prisma";
async function getSales() {
  let recentSales = await prisma.sale.findMany({
    take: 5, // Limit the result to 5 records
    orderBy: {
      date: 'desc', // Order by createdAt field in descending order (most recent first)
    },
    include: {
      nft: {
        include: {
          item: true,
        },
      },
    },
  });
  return recentSales;
}
export default async function Dashboard() {
  let recentSales = await getSales();


  return (
    <>
    <h1>Bienvenue sur Dashboard</h1>
    {/* @ts-ignore */}
      <RecentSales data={ recentSales }  />
    </>
  )

}
