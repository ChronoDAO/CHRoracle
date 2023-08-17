
import React from "react";
import GenerateUserTable from "@/components/generateTables/generateUserTable";
import prisma from "../../../lib/prisma";
import styles from "./userName.module.scss";
import { AnyMxRecord } from "dns";
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

  user = await JSON.parse(JSON.stringify(user));
  console.log(user.nfts[0]);
  return <GenerateUserTable data={user} />;
}
