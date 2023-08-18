"use client";
import React, { useMemo } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import tableHeader from "./tableHeader.module.scss";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  spent: number;
  sold: number;
  balance: number;
}

export default function GenerateUsersTable({ data }: { data: User[] }) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
//@ts-ignore
  const columns: MRT_ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        muiTableHeadCellProps: { sx: { color: "gray" } },
        Cell: ({ renderedCellValue }: { renderedCellValue: number }) => {
          return <>{renderedCellValue}</>;
        },
      },
      {
        accessorKey: "name",
        header: "Name",
        muiTableHeadCellProps: { sx: { color: "grey" } },
        Cell: ({
          cell,
          renderedCellValue,
        }: {
          renderedCellValue: string;
          cell: any; // Adjust the cell type as needed
        }) => (
          <Link href={`/users/${encodeURIComponent(cell.getValue())}`}>
            {renderedCellValue}
          </Link>
        ),
      },
      {
        accessorKey: "sold",
        header: "Sales $",
        muiTableHeadCellProps: { sx: { color: "green" } },
        Cell: ({ renderedCellValue }: { renderedCellValue: number }) => (
          <strong>
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ),
      },
      {
        accessorKey: "spent",
        header: "Purchases $",
        muiTableHeadCellProps: { sx: { color: "red" } },
        Cell: ({ renderedCellValue }: { renderedCellValue: number }) => (
          <strong>
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ),
      },
      {
        accessorKey: "balance",
        header: "Balance",
        muiTableHeadCellProps: { sx: { color: "skyblue" } },
        Cell: ({ renderedCellValue }: { renderedCellValue: number }) => (
          <strong>
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ),
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
