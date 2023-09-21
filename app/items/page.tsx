import GenerateItemsTable from "@/components/generateTables/generateItemsTable";
import SearchBar from "@/components/Search/SearchBar";
import prisma from "@/lib/prisma/prisma";

export default async function Items() {
  let items = await prisma.item.findMany();

  return (
    <>
      <SearchBar searchPath="/searchItem" placeholderText="Enter item name" />

      {/* @ts-ignore */}

      <GenerateItemsTable data={items} />
    </>
  );
}
