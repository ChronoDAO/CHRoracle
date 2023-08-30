import React from "react";
import UsernameNotFound from "@/components/errors/usernameNotFound";
import { getUserHistory } from "@/lib/prismaRequests/user-history";
import UserHistory from "@/components/generateTables/generateUserHistoryTables";
import UserCard from "@/components/UserInfo/userInfoCard";

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
    <UserCard  data={user} />
    {/* @ts-ignore */}
    <UserHistory data={user} />
    {/* <GenerateUserInventoryTable data={user} /> */}
    {/* @ts-ignore */}
    
    </>
    );
}
