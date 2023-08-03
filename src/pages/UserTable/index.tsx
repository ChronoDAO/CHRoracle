import { PrismaClient, User } from "@prisma/client";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { MaterialReactTable } from "material-react-table";
import React, { useMemo} from "react";
import Link from "next/link";
const prisma = new PrismaClient();

export const getStaticProps: GetStaticProps = async () => {
  let users = await prisma.user.findMany();

  users = JSON.parse(JSON.stringify(users));

  return {
    props: {
      users, 
    },
  };
};

export default function UserTable({
  users,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id", //simple recommended way to define a column
        header: "ID",
        muiTableHeadCellProps: { sx: { color: "black" } }, //custom props
        Cell: ({ renderedCellValue }) => {renderedCellValue}, //optional custom cell render
      },
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Nom",
        muiTableHeadCellProps: { sx: { color: "grey" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "spent", //simple recommended way to define a column
        header: "A dépensé $",
        muiTableHeadCellProps: { sx: { color: "red" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "sold", //simple recommended way to define a column
        header: "A vendu $",
        muiTableHeadCellProps: { sx: { color: "blue" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "balance", //simple recommended way to define a column
        header: "Balance",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
    ],
    []
  );

  return (
    <>
      <MaterialReactTable columns={columns} data={users} />
      <Link href="/">Go back to Home</Link>
    </>
  );
}