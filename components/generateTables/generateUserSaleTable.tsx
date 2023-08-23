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
  // State to manage modal open/close for each table
  const [dropModalOpen, setDropModalOpen] = useState(false);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);

  // Toggle modal functions
  const toggleDropModal = () => setDropModalOpen(!dropModalOpen);
  const togglePurchaseModal = () => setPurchaseModalOpen(!purchaseModalOpen);
  const toggleSaleModal = () => setSaleModalOpen(!saleModalOpen);

  const dropColumns = useMemo<MRT_ColumnDef<Drop>[]>(
    () => [
      {
        accessorKey: "nft.item.imageUrl",
        header: "Image",
        size: 50,
        muiTableHeadCellProps: { sx: { color: "gray" } },
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
        muiTableHeadCellProps: { sx: { color: "grey" } },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "nft.issuedId",
        header: "ID",
        size: 50,
        muiTableHeadCellProps: { sx: { color: "black" } },
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
        muiTableHeadCellProps: { sx: { color: "gray" } },
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
        muiTableHeadCellProps: { sx: { color: "grey" } },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "nft.issuedId",
        size: 50,
        header: "NFT ID",
        muiTableHeadCellProps: { sx: { color: "black" } },
      },
      {
        accessorKey: "fromUser",
        header: "Seller",
        muiTableHeadCellProps: { sx: { color: "red" } },
      },
      {
        accessorKey: "price",
        header: "Price",
        muiTableHeadCellProps: { sx: { color: "orange" } },
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
        muiTableHeadCellProps: { sx: { color: "gray" } },
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
        muiTableHeadCellProps: { sx: { color: "grey" } },
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "nft.issuedId",
        header: "NFT ID",
        muiTableHeadCellProps: { sx: { color: "black" } },
      },
      {
        accessorKey: "toUser",
        header: "Buyer",
        size: 100,
        muiTableHeadCellProps: { sx: { color: "red" } },
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 50,
        muiTableHeadCellProps: { sx: { color: "orange" } },
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

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ThemeProvider theme={darkTheme}>
        {/* Drop Modal */}
        <Modal open={dropModalOpen} onClose={toggleDropModal} className={styles.modal}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="tableTitle">Dropsof {data.name}</h2>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                className={styles["modal-close"]}
                onClick={toggleDropModal}
              >
                <CloseIcon />
              </IconButton>
            </div>
            {data.drops.length > 0 ? (
              <MaterialReactTable columns={dropColumns} data={data.drops} />
            ) : (
              <p>No drops available for this user.</p>
            )}
          </div>
        </Modal>

        {/* Purchase Modal */}
        <Modal open={purchaseModalOpen} onClose={togglePurchaseModal} className={styles.modal}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="tableTitle">Purchases of {data.name}</h2>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                className={styles["modal-close"]}
                onClick={togglePurchaseModal}
              >
                <CloseIcon />
              </IconButton>
            </div>
            {data.purchases.length > 0 ? (
              <MaterialReactTable
                columns={purchaseColumns}
                data={data.purchases}
              />
            ) : (
              <p>No purchases available for this user.</p>
            )}
          </div>
        </Modal>

        {/* Sale Modal */}
        <Modal open={saleModalOpen} onClose={toggleSaleModal} className={styles.modal} >
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="tableTitle">Salesof {data.name}</h2>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                className={styles["modal-close"]}
                onClick={toggleSaleModal}
              >
                <CloseIcon />
              </IconButton>
            </div>
            {data.sales.length > 0 ? (
              <MaterialReactTable columns={saleColumns} data={data.sales} />
            ) : (
              <p>No sales available for this user.</p>
            )}
          </div>
        </Modal>

        {/* Buttons to open modals */}
        <div className="tableContainer">
          {data.drops.length > 0 ? (
            <Button onClick={toggleDropModal}>
              Show Drop Details ({data.drops.length})
            </Button>
          ) : (
            <h3>{data.name} hasn't dropped anything yet.</h3>
          )}
        </div>
        <div className="tableContainer">
          {data.purchases.length > 0 ? (
            <Button onClick={togglePurchaseModal}>
              Show Purchase Details ({data.purchases.length})
            </Button>
          ) : (
            <h3>{data.name} hasn't bought anything yet.</h3>
          )}
        </div>
        <div className="tableContainer">
          {data.sales.length > 0 ? (
            <Button onClick={toggleSaleModal}>
              Show Sale Details ({data.sales.length})
            </Button>
          ) : (
            <h3>{data.name} hasn't sold anything yet.</h3>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
}
