"use client";
import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import tableHeader from "./tableHeader.module.scss";
import Link from "next/link";

export default function GenerateUsersTable({ data }: { data: any }) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        muiTableHeadCellProps: { sx: { color: "gray" } },
        Cell: ({ renderedCellValue }:{renderedCellValue: number}) => {
          return renderedCellValue;
        },
      },
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Name",
        muiTableHeadCellProps: { sx: { color: "grey" } }, //custom props
        Cell: ({ cell, renderedCellValue }:{renderedCellValue: number, cell: any}) => (
          <Link href={`/users/${encodeURIComponent(cell.getValue())}`}>
            {renderedCellValue}
          </Link>
        ), //optional custom cell render
      },
      {
        accessorKey: "sold", //simple recommended way to define a column
        header: "Sales $",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }:{renderedCellValue: number}) => (
          <strong>
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "spent", //simple recommended way to define a column
        header: "Purchases $",
        muiTableHeadCellProps: { sx: { color: "red" } }, //custom props
        Cell: ({ renderedCellValue }:{renderedCellValue: number}) => (
          <strong>
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "balance", //simple recommended way to define a column
        header: "Balance",
        muiTableHeadCellProps: { sx: { color: "skyblue" } }, //custom props
        Cell: ({ renderedCellValue }:{renderedCellValue: number}) => (
          <strong>
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ), //optional custom cell render
      },
    ],
    []
  );

  return (
    <>
      <div className={tableHeader.container}>
        <h1 className={tableHeader.title}>Users Table</h1>
      </div>
      <ThemeProvider theme={darkTheme}>
        <MaterialReactTable columns={columns} data={data} />
      </ThemeProvider>
      <Link href="/">Go back to Home</Link>
    </>
  );
}
