import prisma from "../../lib/prisma";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Table from "../../components/table/Table";
import React, { useMemo } from "react";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
  let users = await prisma.user.findMany();

  users = JSON.parse(JSON.stringify(users));

  return {
    props: {
      users,
    },
  };
};

export default function Users({
  users,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id", 
        header: "ID",
        muiTableHeadCellProps: { sx: { color: "gray" } }, 
        Cell: ({ renderedCellValue }) => {
         return  renderedCellValue;
        }, 
      },
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Name",
        muiTableHeadCellProps: { sx: { color: "grey" } }, //custom props
        Cell: ({ cell, renderedCellValue }) => (
          <Link href={`/users/${encodeURIComponent(cell.getValue())}`}>
            {renderedCellValue}
          </Link>
        ), //optional custom cell render
      },
      {
        accessorKey: "sold", //simple recommended way to define a column
        header: "Sales $",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <strong>
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "spent", //simple recommended way to define a column
        header: "Purchases $",
        muiTableHeadCellProps: { sx: { color: "red" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <strong>
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "balance", //simple recommended way to define a column
        header: "Balance",
        muiTableHeadCellProps: { sx: { color: "skyblue" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          <strong>
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ), //optional custom cell render
      },
    ],
    []
  );
  console.log(users[1])
  return (
  
    <>
      <Table viewName="User" columns={columns} data={users} />
    </>
  );
}
