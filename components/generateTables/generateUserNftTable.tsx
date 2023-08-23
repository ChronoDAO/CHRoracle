"use client";
import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import tableHeader from "./tableHeader.module.scss";
import Link from "next/link";
import { type MRT_ColumnDef } from "material-react-table";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import NFTCard from "../cardNFT/NFTCard";

const COLORS = ["#0088FE", "#ff7e03", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

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
  drops: any[];
}

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
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function GenerateUserInventoryTable({ data }: { data: User }) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const columns = useMemo<MRT_ColumnDef<NFT>[]>(
    () => [
      {
        accessorKey: "archetypeId", //simple recommended way to define a column
        header: "ID",
        muiTableHeadCellProps: { sx: { color: "black" } }, //custom props
        Cell: ({ renderedCellValue }) => (
          //  @ts-ignore
          <Link href={`/items/${encodeURIComponent(renderedCellValue)}`}>
            {renderedCellValue}
          </Link>
        ), //optional custom cell render
      },
      {
        accessorKey: "item.name", //simple recommended way to define a column
        header: "Item Name",
        muiTableHeadCellProps: { sx: { color: "grey" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
      },
      {
        accessorKey: "item.floorPrice", //simple recommended way to define a column
        header: "FloorPrice $",
        muiTableHeadCellProps: { sx: { color: "red" } }, //custom props

        Cell: ({ renderedCellValue }) => (
          <strong>
            {/* @ts-ignore */}
            {Number(renderedCellValue.toFixed(2)).toLocaleString()}
          </strong>
        ), //optional custom cell render
      },
      {
        accessorKey: "item.rarityName", //simple recommended way to define a column
        header: "Rarity",
        muiTableHeadCellProps: { sx: { color: "blue" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
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

  // const proportionDrop = parseFloat(
  //   ((data.user.drops.length / data.nfts.length) * 100).toFixed(2)
  // );
  // const proportionUni = parseFloat(
  //   ((data.uniqueNFTCount / data.nfts.length) * 100).toFixed(2)
  // );

  // const pieData = [
  //   { name: "Drops", value: data.user.drops.length },
  //   { name: "NFTs", value: data.user.nfts.length - data.user.drops.length }
  // ];
  // Calculate the sum of floorPrice values for all NFTs
  // let sumFloorPrice = data.nfts.reduce(
  //   ({ total, nft }: { total: number; nft: any }) => {
  //     return total + (nft.item?.floorPrice || 0);
  //   },
  //   0
  // );

  // sumFloorPrice = Number(sumFloorPrice.toFixed(2));

  return (
    <>
      {/* <div>
        <div>
          <h1>{data.name}</h1>
        </div>
        <div>
          <h3>
            Balance Purchases/Sales:{" "}
            {Number(data.balance.toFixed(2)).toLocaleString()} $
          </h3>

          <h3>
                Sum of Floor Prices of Owned NFTs:{" "}
                {sumFloorPrice.toLocaleString()} $
              </h3>
          <h3>
                Value Generated on BigTime:{" "}
                {Number(
                  (data.balance + sumFloorPrice).toFixed(2)
                ).toLocaleString()}{" "}
                $
              </h3>
        </div>
        <div style={{ backgroundColor: "#0E1010", minHeight: "100vh" }}>
          <style>
            {`
          body {
            margin: 0;
          }
        `}
          </style>

          <NFTCard
            totalNFTs={data.user.nfts.length}
            totalValue={parseFloat(data.user.balance.toFixed(2))}
            totalDropNFT={data.user.drops.length}
            proportion={proportionDrop}
            uniqueNFTs={data.uniqueNFTCount}
            proportionUni={proportionUni}
          />

          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              cx={200}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 1 ? "#ff7e03" : "#8884d8"}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div> 
        <Link href="/users">Go back to Users list</Link>
      </div> */}
      <div className={tableHeader.container}>
        <h1 className={tableHeader.title}>{data.name}</h1>
      </div>
      <ThemeProvider theme={darkTheme}>
        <MaterialReactTable columns={columns} data={data.nfts} />
      </ThemeProvider>
    </>
  );
}
