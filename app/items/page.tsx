import prisma from "../../lib/prisma";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Table from "../../components/table/Table";
import React, { useMemo } from "react";
import Link from "next/link";
import style from './items.module.scss'

export default async function Items() {
  let items = await prisma.item.findMany();

  items = JSON.parse(JSON.stringify(items));

  const columns = useMemo(
    () => [
      {
        accessorKey: "imageUrl",
        header: "Item",
        muiTableHeadCellProps: { sx: { color: "gray" } },
        Cell: ({ row }: { row: any }) => (
          <Link href={`/items/${encodeURIComponent(row.original.archetypeId)} `}>
            <img src={row.original.imageUrl} alt ="" className={style.img}/>
          </Link>
        ),
      },
      {
        accessorKey: "archetypeId", //simple recommended way to define a column
        header: "ID",
        muiTableHeadCellProps: { sx: { color: "gray" } }, //custom props
        Cell: ({ renderedCellValue }: { renderedCellValue: number }) => (
          <Link href={`/items/${encodeURIComponent(renderedCellValue)}`}>
            {renderedCellValue}
          </Link>
        ), //optional custom cell render
      },
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Name",
        muiTableHeadCellProps: { sx: { color: "gray" } }, //custom props
        Cell: ({ renderedCellValue }: { renderedCellValue: string }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "floorPrice", //simple recommended way to define a column
        header: "Floor Price $",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }: { renderedCellValue: number }) => (
          <strong>
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "maxIssuance", //simple recommended way to define a column
        header: "Max Issuance",
        muiTableHeadCellProps: { sx: { color: "red" } }, //custom props
        Cell: ({ renderedCellValue }: { renderedCellValue: number }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "rarityName", //simple recommended way to define a column
        header: "Rarity",
        muiTableHeadCellProps: { sx: { color: "skyblue" } }, //custom props
        Cell: ({ renderedCellValue }: { renderedCellValue: string }) => (
        <div className={`${style[renderedCellValue]} `} >{renderedCellValue}</div>
        ), 
      },
    ],
    []
  );


  return (
    <>
      <Table viewName="item's list" columns={columns} data={items} />
    </>
  );
}
