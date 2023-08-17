"use client";
import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import tableHeader from "./tableHeader.module.scss";
import Link from "next/link";

export default function GenerateUserTable({ data }: { data: any }) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "archetypeId", //simple recommended way to define a column
        header: "ID",
        muiTableHeadCellProps: { sx: { color: "black" } }, //custom props
        Cell: ({ renderedCellValue }: { renderedCellValue: number }) => (
          <Link href={`/items/${encodeURIComponent(renderedCellValue)}`}>
            {renderedCellValue}
          </Link>
        ), //optional custom cell render
      },
      {
        accessorKey: "item.name", //simple recommended way to define a column
        header: "Item Name",
        muiTableHeadCellProps: { sx: { color: "grey" } }, //custom props
        Cell: ({ renderedCellValue }: { renderedCellValue: string }) => (
          <strong>{renderedCellValue}</strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "item.floorPrice", //simple recommended way to define a column
        header: "FloorPrice $",
        muiTableHeadCellProps: { sx: { color: "red" } }, //custom props
        Cell: ({ renderedCellValue }: { renderedCellValue: number }) => (
          <strong>
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "item.rarityName", //simple recommended way to define a column
        header: "Rarity",
        muiTableHeadCellProps: { sx: { color: "blue" } }, //custom props
        Cell: ({ renderedCellValue }: { renderedCellValue: string }) => (
          <strong>{renderedCellValue}</strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "item.maxIssuance", //simple recommended way to define a column
        header: "Max Issuance",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }: { renderedCellValue: number }) => (
          <strong>{renderedCellValue}</strong>
        ), //optional custom cell render
      },
    ],
    []
  );

  // Calculate the sum of floorPrice values for all NFTs
  // let sumFloorPrice = data.nfts.reduce(
  //   ({ total, nft }: { total: number; nft: any }) => {
  //     return total + (nft.item?.floorPrice || 0);
  //   },
  //   0
  // );

  // sumFloorPrice = Number(sumFloorPrice.toFixed(2));

  return (
        <>
          <div>
            <div>
              <h1>{data.name}</h1>
            </div>
            <div>
              <h3>
                Balance Purchases/Sales:{" "}
                {Number(data.balance.toFixed(2)).toLocaleString()} $
              </h3>
              {/* <h3>
                Sum of Floor Prices of Owned NFTs:{" "}
                {sumFloorPrice.toLocaleString()} $
              </h3> */}
              {/* <h3>
                Value Generated on BigTime:{" "}
                {Number(
                  (data.balance + sumFloorPrice).toFixed(2)
                ).toLocaleString()}{" "}
                $
              </h3> */}
            </div>
          </div>
          <div className={tableHeader.container}>
            <h1 className={tableHeader.title}>{data.name}</h1>
          </div>
          <ThemeProvider theme={darkTheme}>
            <MaterialReactTable columns={columns} data={data.nfts} />
          </ThemeProvider>
          <Link href="/users">Go back to Users list</Link>
        </>
  );
}
