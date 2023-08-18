import React from "react";
import GenerateUserTable from "@/components/generateTables/generateUserTable";
import prisma from "../../../lib/prisma";
import styles from "./userName.module.scss";
import { AnyMxRecord } from "dns";
import UsernameNotFound from "@/components/errors/usernameNotFound";
type Params = {
  params: {
    username: string;
  };
};
const COLORS = ["#0088FE", "#ff7e03", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

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

export default async function User({ params: { username } }: Params) {
  let user = await prisma.user.findFirst({
    where: {
      name: username,
    },
    include: {
      nfts: {
        include: {
          item: true,
        },
      },
      purchases: { select: { id: true, date: true } },
      drops: { select: { id: true, date: true } },
    },
  });

  if (!user) {
    return <UsernameNotFound username={username} />;
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

  const archetypeIds = nftsWithSerializedDates.map((nft) => nft.archetypeId).filter((archetypeId) => archetypeId !== null) as string[];

  const uniqueArchetypeIds = [...new Set(archetypeIds)];
  const uniqueNFTCount = uniqueArchetypeIds.length;
  let data = {
    user: {
      ...user,
      purchases: purchasesWithSerializedDates,
      drops: dropsWithSerializedDates,
      nfts: nftsWithSerializedDates,
    },
    uniqueNFTCount,
  };
  //@ts-ignore
  return <GenerateUserTable data={data} />;
}
