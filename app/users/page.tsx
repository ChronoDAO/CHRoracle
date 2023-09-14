import React from "react";
import GenerateUsersTable from "@/components/generateTables/generateUsersTable";
import SearchBar from "@/components/Search/SearchBar";
import prisma from "../../lib/prisma/prisma";

export default async function Users() {
  let users = await prisma.user.findMany();

  return (
    <div>
      <SearchBar searchPath="/searchUser" placeholderText="Enter user name" />
      <GenerateUsersTable data={users} />
    </div>
  );
}
