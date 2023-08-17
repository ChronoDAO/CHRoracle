import React from 'react';
import GenerateTable from '@/components/generateTables/generateUsersTable';
import prisma from "../../lib/prisma";

export default async function Users() {
  let users = await prisma.user.findMany();

  users = await JSON.parse(JSON.stringify(users));

  return (
    <GenerateTable data={users} />
  );
}