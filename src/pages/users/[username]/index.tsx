import prisma from "../../../lib/prisma";
import Table from "../../../components/table/Table";
import Link from "next/link";
import { useMemo } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import styles from "./userName.module.scss";

export default function User({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "archetypeId", //simple recommended way to define a column
        header: "ID",
        muiTableHeadCellProps: { sx: { color: "black" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <Link href={`/items/${encodeURIComponent(renderedCellValue)}`}>
            {renderedCellValue}
          </Link>
        ), //optional custom cell render
      },
      {
        accessorKey: "item.name", //simple recommended way to define a column
        header: "Item Name",
        muiTableHeadCellProps: { sx: { color: "grey" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "item.floorPrice", //simple recommended way to define a column
        header: "FloorPrice $",
        muiTableHeadCellProps: { sx: { color: "red" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <strong>
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "item.rarityName", //simple recommended way to define a column
        header: "Rarity",
        muiTableHeadCellProps: { sx: { color: "blue" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "item.maxIssuance", //simple recommended way to define a column
        header: "Max Issuance",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
    ],
    []
  );

  // Calculate the sum of floorPrice values for all NFTs
  let sumFloorPrice = user.nfts.reduce((total, nft) => {
    return total + (nft.item?.floorPrice || 0);
  }, 0);

  sumFloorPrice = Number(sumFloorPrice.toFixed(2));

  return (
    <>
      {user ? (
        <>
          <div className={styles.container}>
            <div className={styles["user-name"]}>
              <h1>{user.name}</h1>
            </div>

            <div className={styles["info-container"]}>

            <h3>
              Balance Purchases/Sales:{" "}
              {Number(user.balance.toFixed(2)).toLocaleString()} $
            </h3>
            <h3>
              Sum of Floor Prices of Owned NFTs:{" "}
              {sumFloorPrice.toLocaleString()} $
            </h3>
            <h3>
              Value Generated on BigTime:{" "}
              {Number(
                (user.balance + sumFloorPrice).toFixed(2)
              ).toLocaleString()}{" "}
              $
            </h3>
            </div>
          </div>
          <Table viewName="NTF's" columns={columns} data={user.nfts} />
        </>
      ) : (
        <p>User not found.</p>
      )}
      <Link href="/users">Go back to Users list</Link>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // @ts-ignore
  const { username } = context.params;

  const user = await prisma.user.findFirst({
    where: {
      name: username,
    },
    include: {
      nfts: {
        include: {
          item: true,
        },
      },
    },
  });

  if (!user) {
    return {
      notFound: true, // Return a 404 page if user is not found
    };
  }

  return {
    props: {
      user,
    },
  };
};
