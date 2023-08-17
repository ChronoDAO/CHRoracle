// import prisma from "../../lib/prisma";
// import type { InferGetStaticPropsType, GetStaticProps } from "next";
// import React, { useMemo } from "react";
// import Table from "../table/Table";
// import Link from "next/link";
// import { getOwnersGroupedByOwners } from "../../lib/nfts-grouped-by-owners"

// export const getStaticProps: GetStaticProps = async () => {
//   const archetypeId = "BT0_jade_pass_0"; 
//   const ownersGrouped = await getOwnersGroupedByOwners(archetypeId);

//   const totalNFTS = ownersGrouped.reduce(
//     (total, owner) => total + owner._count.ownerName,
//     0
//   );
//   const totalOwners = ownersGrouped.length;

//   return {
//     props: {
//       ownersGrouped,
//       totalNFTS,
//       totalOwners,
//     },
//   };
// };

// export default function OwnersGrouped({
//   ownersGrouped,
//   totalNFTS,
//   totalOwners,
// }: InferGetStaticPropsType<typeof getStaticProps>) {


//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "ownerName",
//         header: "User Name",
//         muiTableHeadCellProps: { sx: { color: "gray" } },
//         Cell: ({ renderedCellValue }) => (
//           <Link href={`/users/${encodeURIComponent(renderedCellValue)}`}>
//             {renderedCellValue}
//           </Link>
//         ),
//       },
//       {
//         accessorKey: "_count.ownerName",
//         header: "NFTS",
//         muiTableHeadCellProps: { sx: { color: "skyblue" } },
//         Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
//       },
//     ],
//     []
//   );

//   return (
//     <>
//     <h1> NFTS: {totalNFTS} </h1>
//     <h1> Owners: {totalOwners} </h1>
//       <Table
//         viewName="Owners Grouped List"
//         columns={columns}
//         data={ownersGrouped}
//       />
//     </>
//   );
// }
