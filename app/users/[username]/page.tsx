import React from "react";
import GenerateUserInventoryTable from "@/components/generateTables/generateUserInventoryTable";
import UsernameNotFound from "@/components/errors/usernameNotFound";
import { getUserHistory } from "@/lib/prisma/user-history";
import GenerateUserSaleTable from "@/components/generateTables/generateUserSaleTable";
import UserPie from "@/components/UserInfo/userInfoPie";

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

  
  return (
    
    <>
    {/* @ts-ignore */}
    <UserPie  data={user} />
    {/* @ts-ignore */}
    <GenerateUserInventoryTable data={user} />
    {/* @ts-ignore */}
    <GenerateUserSaleTable data={user} />
    </>
    );
}
