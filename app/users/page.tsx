import React from 'react';
import GenerateUsersTable from '@/components/generateTables/generateUsersTable';
import prisma from "../../lib/prismaRequests/prisma";

export default async function Users() {
  let users = await prisma.user.findMany();

  return (
    <GenerateUsersTable data={users} />
  );
}