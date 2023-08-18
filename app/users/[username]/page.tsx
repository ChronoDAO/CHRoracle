
import React from "react";
import GenerateUserTable from "@/components/generateTables/generateUserTable";
import prisma from "../../../lib/prisma";
import styles from "./userName.module.scss";
import { AnyMxRecord } from "dns";
import UsernameNotFound from "@/components/errors/usernameNotFound";
type Params = {
  params: {
    username: string
  }
}
export default async function User({ params: { username }}: Params) {

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
    },
  });



  if (!user) {
    return <UsernameNotFound username={username} />;
  }
    
  //@ts-ignore
  return <GenerateUserTable data={user} />;
}
