import prisma from "@/lib/prisma/prisma";
import GenerateItemTable from "@/components/generateTables/generateItemTable";
import ItemNotFound from "@/components/errors/itemNotFound";
import { getOwnersGroupedByOwners } from "@/lib/prisma/nfts-grouped-by-owners";

type Params = {
  params: {
    archetypeid: string
  }
}

export default async function Item({ params: { archetypeid }}: Params)  {

  let item = await prisma.item.findFirst({
    where: {
      archetypeId: archetypeid,
    },
    include: {
      nfts: true,
    },
  });

  if (!item) {
    return <ItemNotFound archetypeId={archetypeid} />
  }

  const ownersGrouped = await getOwnersGroupedByOwners({archetypeid});

  return (
    //@ts-ignore
    <GenerateItemTable data={item} ownersGrouped={ownersGrouped} />
  )
}


