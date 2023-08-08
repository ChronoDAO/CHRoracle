import React from 'react';
import NFTCard from '../../components/NFTCard';
import { PrismaClient } from '@prisma/client';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

const prisma = new PrismaClient();

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

export const getStaticProps: GetStaticProps = async () => {
  const user = await prisma.user.findFirst({
    where: {
      name: 'Istarengwa',
    },
    include: {
      purchases: {
        select: {
          id: true,
          date: true,
        },
      },
      drops: {
        select: {
          id: true,
          date: true,
        },
      },
      nfts: true,
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
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

const NFTPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ user, uniqueNFTCount }) => {
  const proportionDrop = (user.drops.length / user.nfts.length) * 100;
  const proportionUni = (uniqueNFTCount / user.nfts.length) * 100;


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
      <NFTCard 
        totalNFTs={user.nfts.length}
        totalValue={user.balance}
        totalDropNFT={user.drops.length}
        proportion={proportionDrop} 
        uniqueNFTs={uniqueNFTCount}
        proportionUni={proportionUni}
      />

    </div>
  );
};

export default NFTPage;


