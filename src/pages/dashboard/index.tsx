import styles from "./dashboard.module.scss";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import prisma from "../../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
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

  recentSales = JSON.parse(JSON.stringify(recentSales));
  //@ts-ignore
  console.log(recentSales[0].nft.item.name);
  return {
    props: {
      recentSales,
    },
  };
};

export default function Dashboard({
  recentSales,
}: InferGetStaticPropsType<typeof getStaticProps>){
  const formattedSalesData = recentSales.map((sale) => ({
    price: sale.price,
    date: sale.date,
    toUser: sale.toUser,
    fromUser: sale.fromUser,
    issuedId: sale.nft.issuedId,
    itemName: sale.nft.item.name,
    imageUrl: sale.nft.item.imageUrl,
  }));

  console.log('Formatted sales data:', formattedSalesData);


  return (
    <>
       <div className={styles["center-title"]}>
        <h1>Work in progress !</h1>
      </div>
    </>
  )
}
