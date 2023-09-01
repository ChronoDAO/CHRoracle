import React from 'react';
import GenerateItemsTable from '@/components/generateTables/generateItemsTable';
import prisma from "@/lib/prisma/prisma";

export default async function Items() {
  let items = await prisma.item.findMany();

  return (
    <>
    {/* @ts-ignore */}

      <GenerateItemsTable data={items} />

    </>
  );
}
