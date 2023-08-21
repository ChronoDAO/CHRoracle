import React from "react";
import GenerateUserTable from "@/components/generateTables/generateUserTable";
import prisma from "../../../lib/prisma";
import UsernameNotFound from "@/components/errors/usernameNotFound";
type Params = {
  params: {
    username: string;
  };
};

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
  return (
  // <GenerateUserTable data={data} />
  <p>Generate User Table here</p>
  );
}
