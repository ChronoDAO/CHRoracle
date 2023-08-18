"use client";
import React, { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import tableHeader from "./tableHeader.module.scss";
import Link from "next/link";
import style from './items.module.scss';

interface Item {
  archetypeId: string;
  name: string;
  description: string | null;
  imageUrl: string ;
  floorPrice: number ;
  maxIssuance: number;
  setName: string | null;
  rarityName: string ;
  collectionName: string | null;
  optionName: string;
}

export default function GenerateItemsTable({ data }: { data: Item[] }) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
//@ts-ignore
  const columns: MRT_ColumnDef<Item>[] = useMemo(
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
        Cell: ({ renderedCellValue }: { renderedCellValue: string }) => (
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
      <div className={tableHeader.container}>
        <h1 className={tableHeader.title}>Items Table</h1>
      </div>
      <ThemeProvider theme={darkTheme}>
        <MaterialReactTable columns={columns} data={data} />
      </ThemeProvider>
      <Link href="/">Go back to Home</Link>
    </>
  );
}
