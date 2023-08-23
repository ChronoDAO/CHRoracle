import React from "react";
import GenerateUserInventoryTable from "@/components/generateTables/generateUserNftTable";
import UsernameNotFound from "@/components/errors/usernameNotFound";
import { getUserHistory } from "@/lib/prisma/user-history";
import GenerateUserSaleTable from "@/components/generateTables/generateUserSaleTable";

type Params = {
  params: {
    username: string;
  };
};

export default async function User({ params:  username  }: Params) {
 

  const user = await getUserHistory(username);
  if (!user) {
    return <UsernameNotFound username={username.username} />;
  }
  //  // Convertir les dates en chaînes ISO et gérer les valeurs null
  
  
  return (
    
    <>
    {/* @ts-ignore */}
    <GenerateUserInventoryTable data={user} />
    {/* @ts-ignore */}
    <GenerateUserSaleTable data={user} />
    </>
    );
}
