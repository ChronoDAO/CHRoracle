"use client";
import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import tableHeader from "./tableHeader.module.scss";
import Link from "next/link";
import { type MRT_ColumnDef } from "material-react-table";

interface NFT {
  id: number;
  composedId: string;
  issuedId: number;
  lootDate: Date | null;
  owner: User | null;
  ownerName: string | null;
  item: Item | null;
  archetypeId: string;
}

interface User {
  id: number;
  name: string;
  nfts: NFT[];
  spent: number;
  sold: number;
  balance: number;
  drops: any[];
}

interface Item {
  archetypeId: string;
  name: string;
  description: string | null;
  imageUrl: string;
  floorPrice: number;
  maxIssuance: number;
  setName: string | null;
  rarityName: string | null;
  collectionName: string | null;
  optionName: string;
}



export default function GenerateUserInventoryTable({ data }: { data: User }) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const columns = useMemo<MRT_ColumnDef<NFT>[]>(
    () => [
      {
        accessorKey: "archetypeId", //simple recommended way to define a column
        header: "ID",
        muiTableHeadCellProps: { sx: { color: "black" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          //  @ts-ignore
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
            {/* @ts-ignore */}
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



  return (
    <>
      
      <div className={tableHeader.container}>
        <h1 className={tableHeader.title}>{data.name}</h1>
      </div>
      <ThemeProvider theme={darkTheme}>
        <MaterialReactTable columns={columns} data={data.nfts} />
      </ThemeProvider>
    </>
  );
}
