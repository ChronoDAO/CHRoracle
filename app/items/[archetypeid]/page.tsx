import prisma from "../../../lib/prisma";
import Table from "../../../components/table/Table";
import Link from "next/link";
import { useMemo } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import styles from "./archetypeID.module.scss";
import { getOwnersGroupedByOwners } from "../../../lib/nfts-grouped-by-owners";
import NFTChart from "../../../components/charts/NFTchart";



export default function Item({
  item,
  totalOwners,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "issuedId", //simple recommended way to define a column
        header: "issuedId",
        muiTableHeadCellProps: { sx: { color: "gray" } }, //custom props
        Cell: ({ renderedCellValue }: { renderedCellValue: number }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "ownerName", //simple recommended way to define a column
        header: "Owner",
        muiTableHeadCellProps: { sx: { color: "skyblue" } }, //custom props
        Cell: ({ renderedCellValue }: { renderedCellValue: string }) => (
          <Link href={`/users/${encodeURIComponent(renderedCellValue)}`}>
            {renderedCellValue}
          </Link>
        ), //optional custom cell render
      },
    ],
    []
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles["item-name"]}>
          <h1>{item.name}</h1>
        </div>
        <div className={styles["body-container"]}>
          <div className={styles["img-container"]}>
            <img src={item.imageUrl} className={styles.img} />
          </div>
          <div className={styles["info-container"]}>
            <div className={styles["line-spacing"]}>
              <h3>Max Issuance : {item.maxIssuance}</h3>
              <h3>
                FloorPrice :{" "}
                {Number(item.floorPrice.toFixed(2)).toLocaleString()}
              </h3>

              {item.setName ? <h3>{item.setName}</h3> : <h3>Pas de set</h3>}
              <h3>Number of NFTs issued: {item.nfts.length}</h3>
            </div>
          </div>
          <div className={styles["owners-info-container"]}>
            <h1> Owners: {totalOwners} </h1>
            <div className={styles["diagram-container"]}> 
              <NFTChart nftsCount={item.nfts.length} maxIssuance={item.maxIssuance} />
            </div>
          </div>
        </div>
      </div>
      
      
      <Table viewName="NFT's" columns={columns} data={item.nfts} />
      <Link href="/items">Go back to Items list</Link>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // @ts-ignore
  const { archetypeid } = context.params;

  const item = await prisma.item.findFirst({
    where: {
      archetypeId: archetypeid,
    },
    include: {
      nfts: true,
    },
  });

  if (!item) {
    return {
      notFound: true, // Return a 404 page if item is not found
    };
  }

  const ownersGrouped = await getOwnersGroupedByOwners(item.archetypeId);

  const totalOwners = ownersGrouped.length;

  return {
    props: {
      item,
      ownersGrouped,
      totalOwners,
    },
  };
};
