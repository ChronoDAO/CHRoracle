"use client";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


interface ClientPieData {
  user: User;
  uniqueNFTCount: number;
}
interface NFT {
  id: number;
  composedId: string;
  issuedId: number;
  lootDate: any | null;
  owner: User | null;
  ownerName: string | null;
  item: Item;
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
  purchases: any[];
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
const RADIAN = Math.PI / 180;

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

export default function ({ user, uniqueNFTCount }: ClientPieData) {


  const pieData = [
    { name: "Drops", value: user.drops.length },
    { name: "NFTs", value: user.nfts.length - user.drops.length },
  ];

  return (
    
      <PieChart  width={400} height={400}>
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
    
  );
}
