import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import NFTCard from '../../components/cardNFT/NFTCard';
import { PrismaClient } from '@prisma/client';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const prisma = new PrismaClient();

const COLORS = ["#0088FE", "#ff7e03", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
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

interface UserData {
  name: string;
  purchases: {
    id: number;
    date: string;
  }[];
  balance: number;
  drops: {
    id: number;
    date: string;
  }[];
  nfts: {
    id: number;
    composedId: string;
    issuedId: number;
    lootDate: string | null;
    ownerName: string | null;
    archetypeId: string | null;
  }[];
}

interface UserType {
  id: number;
  name: string;
  nfts: any[];  
  drops: any[];  
  balance: number;
  
}

interface NFTProps {
  user: UserType;
  uniqueNFTCount: number;
}

interface MyObject {
  user: UserType;
  [key: string]: any;  
}



export const getServerSideProps: GetServerSideProps<NFTProps> = async (context) => {
  const name = context.query.name as string || 'Istarengwa';

  const user = await prisma.user.findFirst({
    where: { name },
    include: {
      purchases: { select: { id: true, date: true } },
      drops: { select: { id: true, date: true } },
      nfts: true,
    },
  });

  if (!user) {
    return { notFound: true };
  }

  // Convertir les dates en chaînes ISO et gérer les valeurs null
  const purchasesWithSerializedDates = user.purchases.map((purchase) => ({
    ...purchase,
    date: purchase.date.toISOString(),
  }));

  const dropsWithSerializedDates = user.drops.map((drop) => ({
    ...drop,
    date: drop.date.toISOString(),
  }));

  const nftsWithSerializedDates = user.nfts.map((nft) => ({
    ...nft,
    lootDate: nft.lootDate ? new Date(nft.lootDate).toISOString() : '',
  }));

  const archetypeIds = nftsWithSerializedDates
    .map((nft) => nft.archetypeId)
    .filter((archetypeId) => archetypeId !== null) as string[];

  const uniqueArchetypeIds = [...new Set(archetypeIds)];

  const uniqueNFTCount = uniqueArchetypeIds.length;

  return {
    props: {
      user: {
        ...user,
        purchases: purchasesWithSerializedDates,
        drops: dropsWithSerializedDates,
        nfts: nftsWithSerializedDates,
      },
      uniqueNFTCount,
    },
  };
};

  const NFTPage: React.FC<NFTProps> = ({ user, uniqueNFTCount }) => {
  const [searchName, setSearchName] = useState('');

  const handleSearch = () => {
    location.href = `?name=${searchName}`;
  };

  const proportionDrop = parseFloat(((user.drops.length / user.nfts.length) * 100).toFixed(2));
  const proportionUni = parseFloat(((uniqueNFTCount / user.nfts.length) * 100).toFixed(2));

  const data = [
    { name: "Drops", value: user.drops.length },
    { name: "NFTs", value: user.nfts.length - user.drops.length }
  ];

  return (
    <div style={{ backgroundColor: '#0E1010', minHeight: '100vh' }}>
      <style>
        {`
          body {
            margin: 0;
          }
        `}
      </style>

      <h1 style={{ color: 'white', padding: '10px', margin: '0' }}>Page NFT</h1>

      {/* Champ de recherche */}
      <input
        type="text"
        value={searchName}
        onChange={e => setSearchName(e.target.value)}
        placeholder="Entrer un pseudo"
      />
      <button onClick={handleSearch}>Rechercher</button>

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
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8" 
          dataKey="value"
        >
          {data.map((entry, index) => (
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
  );
};

export default NFTPage;


