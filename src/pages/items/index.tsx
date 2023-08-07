import prisma from "../../lib/prisma";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Table from "../../components/table/Table";
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
        muiTableHeadCellProps: { sx: { color: "gray" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <Link href={`/items/${encodeURIComponent(renderedCellValue)}`}>
            {renderedCellValue}
          </Link>
        ), //optional custom cell render
      },
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Name",
        muiTableHeadCellProps: { sx: { color: "grey" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "floorPrice", //simple recommended way to define a column
        header: "Floor Price $",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <strong>
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "maxIssuance", //simple recommended way to define a column
        header: "Max Issuance",
        muiTableHeadCellProps: { sx: { color: "red" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "rarityName", //simple recommended way to define a column
        header: "Rarity",
        muiTableHeadCellProps: { sx: { color: "skyblue" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
    ],
    []
  );

  return (
    <>
      <Table viewName="Item" columns={columns} data={items} />
    </>
  );
}
