import styles from "./dashboard.module.scss";
import RecentSales from '../../components/RecentSales/RecentSales';
import prisma from "../../lib/prisma";

export default async function Dashboard() {
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

  console.log(recentSales[0]);
  return (
    <>
    <h1>Bienvenue sur Dashboard</h1>
    {/* @ts-ignore */}
      <RecentSales data={ recentSales }  />
    </>
  )

}
