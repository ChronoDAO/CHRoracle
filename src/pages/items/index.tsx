import prisma from '../../lib/prisma';
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { MaterialReactTable } from "material-react-table";
import React, { useMemo } from "react";
import Link from "next/link";


export const getStaticProps: GetStaticProps = async () => {
  let items = await prisma.item.findMany();

  items = JSON.parse(JSON.stringify(items));

  return {
    props: {
      items,
    },
  };
};

export default function Items({
  items,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
        accessorKey: "name", //simple recommended way to define a column
        header: "Nom",
        muiTableHeadCellProps: { sx: { color: "grey" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "floorPrice", //simple recommended way to define a column
        header: "floorPrice $",
        muiTableHeadCellProps: { sx: { color: "red" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{Number(renderedCellValue.toFixed(2)).toLocaleString()}</strong>, //optional custom cell render
      },
      {
        accessorKey: "maxIssuance", //simple recommended way to define a column
        header: "max Issuance",
        muiTableHeadCellProps: { sx: { color: "blue" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "rarityName", //simple recommended way to define a column
        header: "Rarity",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
    ],
    []
  );

  return (
    <>
      <h1>Item list:</h1>
      <MaterialReactTable columns={columns} data={items} />
      <Link href="/">Go back to Home</Link>
    </>
  );
}
