import prisma from "../../../lib/prisma";
import { MaterialReactTable } from "material-react-table";
import Link from "next/link";
import { useMemo } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

export default function Item({
  item,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "issuedId", //simple recommended way to define a column
        header: "ID",
        muiTableHeadCellProps: { sx: { color: "black" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "ownerName", //simple recommended way to define a column
        header: "Owner",
        muiTableHeadCellProps: { sx: { color: "grey" } }, //custom props
        Cell: ({ renderedCellValue }) => (
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
      <h1>Details of item : {item.name}</h1>
      <h3>Max Issuance : {item.maxIssuance}</h3>
      <h3>
        FloorPrice : {Number(item.floorPrice.toFixed(2)).toLocaleString()}
      </h3>

      {item.setName ? <h3>{item.setName}</h3> : <h3>Pas de set</h3>}
      <h3>Number of NFTs issued: {item.nfts.length}</h3>
      <MaterialReactTable columns={columns} data={item.nfts} />
      <Link href="/items">Go back to Items list</Link>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  return {
    props: {
      item,
    },
  };
};
