"use client";
import React, { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Link from "next/link";
import { MRT_ColumnDef } from "material-react-table";
import styles from "./UserHistory.module.scss"; // Import your CSS/SCSS file
import { Modal, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
interface NFT {
  id: number;
  composedId: string;
  item: Item;
  issuedId: string;
  archetypeId: string;
}

interface User {
  id: number;
  name: string;
  nfts: NFT[];
  purchases: Purchase[];
  sales: Sale[];
  drops: Drop[];
}

interface Item {
  name: string;
  imageUrl: string;
  floorPrice: number;

  rarityName: string;
  maxIssuance: number;
}

interface Sale {
  id: number;
  price: number;
  toUser: string;
  nft: NFT;
  date: Date;
}

interface Purchase extends Sale {
  fromUser: string;
}

interface Drop {
  id: number;
  date: Date;
  nft: NFT;
}

export default function UserHistory({ data }: { data: User }) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const dropColumns = useMemo<MRT_ColumnDef<Drop>[]>(
    () => [
      {
        accessorKey: "nft.item.imageUrl",
        header: "Image",
        size: 50,

        Cell: ({ row }: { row: any }) => (
          <Link
            href={`/items/${encodeURIComponent(
              row.original.nft.item.archetypeId
            )} `}
          >
            <img
              src={row.original.nft.item.imageUrl}
              alt="NFT"
              style={{ width: "50px", height: "50px" }}
            />
          </Link>
        ),
      },
      {
        accessorKey: "nft.item.name",
        header: "Item Name",
        size: 150,

        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "nft.issuedId",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "date",
        header: "Date",
        Cell: ({ row }: { row: any }) => (
          <span>{new Date(row.original.date).toLocaleString()}</span>
        ),
      },
    ],
    []
  );

  const purchaseColumns = useMemo<MRT_ColumnDef<Purchase>[]>(
    () => [
      {
        accessorKey: "nft.item.imageUrl",
        header: "Image",
        size: 50,

        Cell: ({ row }: { row: any }) => (
          <Link
            href={`/items/${encodeURIComponent(
              row.original.nft.item.archetypeId
            )} `}
          >
            <img
              src={row.original.nft.item.imageUrl}
              alt="NFT"
              style={{ width: "50px", height: "50px" }}
            />
          </Link>
        ),
      },
      {
        accessorKey: "nft.item.name",
        header: "Item Name",
        size: 220,

        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "nft.issuedId",
        size: 50,
        header: "NFT ID",
      },
      {
        accessorKey: "fromUser",
        header: "Seller",
        muiTableHeadCellProps: { sx: { color: "red" } },
      },
      {
        accessorKey: "price",
        header: "Price",
        muiTableHeadCellProps: { sx: { color: "red" } },
      },
      {
        accessorKey: "date",
        header: "Date",
        Cell: ({ row }: { row: any }) => (
          <span>{new Date(row.original.date).toLocaleString()}</span>
        ),
      },
    ],
    []
  );

  const saleColumns = useMemo<MRT_ColumnDef<Sale>[]>(
    () => [
      {
        accessorKey: "nft.item.imageUrl",
        header: "Image",
        size: 50,

        Cell: ({ row }: { row: any }) => (
          <Link
            href={`/items/${encodeURIComponent(
              row.original.nft.item.archetypeId
            )} `}
          >
            <img
              src={row.original.nft.item.imageUrl}
              alt="NFT"
              style={{ width: "50px", height: "50px" }}
            />
          </Link>
        ),
      },
      {
        accessorKey: "nft.item.name",
        header: "Item Name",

        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "nft.issuedId",
        header: "NFT ID",
      },
      {
        accessorKey: "toUser",
        header: "Buyer",
        size: 100,
        muiTableHeadCellProps: { sx: { color: "green" } },
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 50,
        muiTableHeadCellProps: { sx: { color: "green" } },
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 100,
        Cell: ({ row }: { row: any }) => (
          <span>{new Date(row.original.date).toLocaleString()}</span>
        ),
      },
    ],
    []
  );
  const Inventorycolumns = useMemo<MRT_ColumnDef<NFT>[]>(
    () => [
      {
        accessorKey: "item.imageUrl",
        header: "Image",
        size: 50,
        muiTableHeadCellProps: { sx: { color: "gray" } },
        Cell: ({ row }: { row: any }) => {
          if (row.original.item) {
            return (
              <Link
                href={`/items/${encodeURIComponent(
                  row.original.item.archetypeId
                )}`}
              >
                <img
                  src={row.original.item.imageUrl}
                  alt="NFT"
                  style={{ width: "50px", height: "50px" }}
                />
              </Link>
            );
          }
          return null; // Handle the case where nft or item is undefined
        },
      },
      {
        accessorKey: "item.name",
        header: "Item Name",
      },
      {
        accessorKey: "item.floorPrice",
        header: "FloorPrice $",
      },
      {
        accessorKey: "item.rarityName", //simple recommended way to define a column
        header: "Rarity",
        muiTableHeadCellProps: { sx: { color: "skyblue" } }, //@ts-ignore
        Cell: ({ renderedCellValue }: { renderedCellValue: string }) => (
          <div className={`${styles[renderedCellValue]} `}>
            {renderedCellValue}
          </div>
        ),
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
  const [selectedOption, setSelectedOption] = useState("Inventory");

  return (
    <>
      <div className={styles["sales-hystory-container"]}>
        <div className={styles["sales-header"]}>
          <div className={styles["sales-title"]}>What's in the box ?</div>

          <div className={styles["radios-container"]}>
            <input
              type="radio"
              value="Inventory"
              id="Inventory"
              checked={selectedOption === "Inventory"}
              onChange={() => setSelectedOption("Inventory")}
            />
            <label htmlFor="Inventory" className={styles.labels}>
              Inventory
            </label>

            <input
              type="radio"
              value="Purchases"
              id="Purchases"
              checked={selectedOption === "Purchases"}
              onChange={() => setSelectedOption("Purchases")}
            />
            <label htmlFor="Purchases" className={styles.labels}>
              Purchases
            </label>

            <input
              type="radio"
              value="Sales"
              id="Sales"
              checked={selectedOption === "Sales"}
              onChange={() => setSelectedOption("Sales")}
            />
            <label htmlFor="Sales" className={styles.labels}>
              Sales
            </label>
            <input
              type="radio"
              value="Drops"
              id="Drops"
              checked={selectedOption === "Drops"}
              onChange={() => setSelectedOption("Drops")}
            />
            <label htmlFor="Drops" className={styles.labels}>
              Drops
            </label>
          </div>
        </div>
        <ThemeProvider theme={darkTheme}>
          {selectedOption === "Drops" ? (
            <MaterialReactTable
              columns={dropColumns}
              data={data.drops}
              enableColumnOrdering
              enableGrouping
            />
          ) : null}
          {selectedOption === "Purchases" ? (
            <MaterialReactTable
              columns={purchaseColumns}
              data={data.purchases}
              enableColumnOrdering
              enableGrouping
            />
          ) : null}
          {selectedOption === "Sales" ? (
            <MaterialReactTable
              columns={saleColumns}
              data={data.sales}
              enableColumnOrdering
              enableGrouping
            />
          ) : null}
          {selectedOption === "Inventory" ? (
            <MaterialReactTable
              columns={Inventorycolumns}
              data={data.nfts}
              enableColumnOrdering
              enableGrouping
            />
          ) : null}
        </ThemeProvider>
      </div>
    </>
  );
}
