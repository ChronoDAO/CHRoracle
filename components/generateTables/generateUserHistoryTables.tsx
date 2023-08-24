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
import style from "./items.module.scss";
import Items from "@/app/items/page";
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
        accessorKey: "item.name", 
        header: "Item Name",
      },
      {
        accessorKey: "item.floorPrice",
        header: "FloorPrice $",
      },
      {
        accessorKey: "rarityName", //simple recommended way to define a column
        header: "Rarity",
        muiTableHeadCellProps: { sx: { color: "skyblue" } }, //custom props
        Cell: ({ renderedCellValue }: { renderedCellValue: string }) => (
          <div className={`${style[renderedCellValue]} `}>
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
// State to manage which table to display
const [activeTable, setActiveTable] = useState("Inventory");

// Toggle active table
const toggleTable = (tableName: string) => {
  setActiveTable(tableName);
};

const getTableTitle = () => {
  switch (activeTable) {
    case "Drops":
      return "Drops Table";
    case "Purchases":
      return "Purchases Table";
    case "Sales":
      return "Sales Table";
    case "Inventory":
      return "Inventory Table";
    default:
      return "";
  }
};

return (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div className="button-container">
      <Button onClick={() => toggleTable("Drops")}>Show Drops</Button>
      <Button onClick={() => toggleTable("Purchases")}>Show Purchases</Button>
      <Button onClick={() => toggleTable("Sales")}>Show Sales</Button>
      <Button onClick={() => toggleTable("Inventory")}>Show Inventory</Button>
    </div>

    <div className="title-container">
      <h2>{getTableTitle()}</h2>
    </div>

    <div className="table-container">
    <ThemeProvider theme={darkTheme}>
      {activeTable === "Drops" && (
        <MaterialReactTable columns={dropColumns} data={data.drops} />
      )}
      {activeTable === "Purchases" && (
        <MaterialReactTable columns={purchaseColumns} data={data.purchases} />
      )}
      {activeTable === "Sales" && (
        <MaterialReactTable columns={saleColumns} data={data.sales} />
      )}
      {activeTable === "Inventory" && (
        <MaterialReactTable columns={Inventorycolumns} data={data.nfts} />
      )}
    </ThemeProvider>
    </div>
  </div>
);
}
