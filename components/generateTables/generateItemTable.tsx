"use client";
import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import tableHeader from "./tableHeader.module.scss";
import Link from "next/link";
import { type MRT_ColumnDef } from "material-react-table";
import OwnersPieChart from "../OwnersPieChart/OwnersPieChart";
import styles from "./archetypeID.module.scss";

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
  nfts: NFT[];
}

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
  ownerName: string;
  _count: {
    ownerName: number;
  };
}

interface GenerateItemTableProps {
  data: Item;
  ownersGrouped: User[];
}
export default function GenerateItemTable({
  data,
  ownersGrouped,
}: GenerateItemTableProps) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const totalOwners = ownersGrouped.length;

  const columns = useMemo<MRT_ColumnDef<NFT>[]>(
    () => [
      {
        accessorKey: "issuedId", //simple recommended way to define a column
        header: "issuedId",
        muiTableHeadCellProps: { sx: { color: "gray" } }, //custom props
        //@ts-ignore
        Cell: ({ renderedCellValue }: { renderedCellValue: number }) => (
          <strong>{renderedCellValue}</strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "ownerName", //simple recommended way to define a column
        header: "Owner",
        muiTableHeadCellProps: { sx: { color: "skyblue" } }, //custom props
        //@ts-ignore
        Cell: ({ renderedCellValue }: { renderedCellValue: string }) => (
          <Link href={`/users/${encodeURIComponent(renderedCellValue)}`}>
            {renderedCellValue}
          </Link>
        ), //optional custom cell render
      },
    ],
    []
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles["left-side"]}>
          <div className={styles.top}>
            <div className={styles["item-name"]}>
              <h1>{data.name}</h1>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles["img-container"]}>
              <img src={data.imageUrl} className={styles.img} />
            </div>
            <div className={styles["info-container"]}>
              <div className={styles["line-spacing"]}>
                <h3>Max Issuance : {data.maxIssuance}</h3>
                <h3>
                  FloorPrice :{" "}
                  {Number(data.floorPrice.toFixed(2)).toLocaleString()}
                </h3>

                {data.setName ? <h3>{data.setName}</h3> : <h3>Pas de set</h3>}
                <h3>Number of NFTs issued: {data.nfts.length}</h3>
                <h3>Owners: {totalOwners}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["right-side"]}>
          <div className={styles["diagram-container"]}>
            <OwnersPieChart rawData={ownersGrouped} total={data.nfts.length} />
          </div>
        </div>
      </div>
      <div className={tableHeader.container}>
        <h1 className={tableHeader.title}>{data.name}</h1>
      </div>
      <ThemeProvider theme={darkTheme}>
        <MaterialReactTable columns={columns} data={data.nfts} />
      </ThemeProvider>
      <Link href="/items">Go back to Items list</Link>
    </>

  );
}
