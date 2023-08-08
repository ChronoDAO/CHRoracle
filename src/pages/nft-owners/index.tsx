import prisma from "../../lib/prisma";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import React, { useMemo } from "react";
import Table from "../../components/table/Table";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
  const archetypeId = "BT0_jade_pass_0";
  const ownersGrouped = await prisma.nFT.groupBy({
    by: ["ownerName"],
    where: {
      archetypeId: archetypeId,
    },
    _count: {
      ownerName: true,
    },
  });

  return {
    props: {
      ownersGrouped,
    },
  };
};

export default function OwnersGrouped({
  ownersGrouped,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  let totalNFTS = 0;
  ownersGrouped.forEach((owner) => {
    totalNFTS  += owner._count.ownerName;
  });

  let totalOwners = ownersGrouped.length

  const columns = useMemo(
    () => [
      {
        accessorKey: "ownerName",
        header: "User Name",
        muiTableHeadCellProps: { sx: { color: "gray" } },
        Cell: ({ renderedCellValue }) => (
          <Link href={`/users/${encodeURIComponent(renderedCellValue)}`}>
            {renderedCellValue}
          </Link>
        ),
      },
      {
        accessorKey: "_count.ownerName",
        header: "NFTS",
        muiTableHeadCellProps: { sx: { color: "skyblue" } },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
    ],
    []
  );

  return (
    <>
    <h1> NFTS: {totalNFTS} </h1>
    <h1> Owners: {totalOwners} </h1>
      <Table
        viewName="Owners Grouped List"
        columns={columns}
        data={ownersGrouped}
      />
    </>
  );
}
