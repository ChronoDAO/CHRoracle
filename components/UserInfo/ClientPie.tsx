'use client'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import NFTCard from "../cardNFT/NFTCard";

interface ClientPieData{
    user: User;
    uniqueNFTCount: number;
  }interface NFT {
    id: number;
    composedId: string;
    issuedId: number;
    lootDate: any | null;
    owner: User | null;
    ownerName: string | null;
    item: Item ;
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
  
export default function ({ user, uniqueNFTCount }: ClientPieData) {
  const proportionDrop = parseFloat(
    ((user.drops.length / user.nfts.length) * 100).toFixed(2)
  );
  const proportionUni = parseFloat(
    ((uniqueNFTCount / user.nfts.length) * 100).toFixed(2)
  );

  const pieData = [
    { name: "Drops", value: user.drops.length },
    { name: "NFTs", value: user.nfts.length - user.drops.length }
  ];

  return (<div>
          <NFTCard
            totalNFTs={user.nfts.length}
            totalValue={parseFloat(user.balance.toFixed(2))}
            totalDropNFT={user.drops.length}
            proportion={proportionDrop}
            uniqueNFTs={uniqueNFTCount}
            proportionUni={proportionUni}
          />

          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              cx={200}
              cy={200}
              labelLine={false}
              // label={renderCustomizedLabel}
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
  )
}