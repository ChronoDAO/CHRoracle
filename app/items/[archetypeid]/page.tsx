import prisma from "../../../lib/prisma";
import GenerateItemTable from "@/components/generateTables/generateItemTable";
import ItemNotFound from "@/components/errors/itemNotFound";
import { getOwnersGroupedByOwners } from "../../../lib/nfts-grouped-by-owners";

type Params = {
  params: {
    archetypeid: string
  }
}


export default async function Item({ params: { archetypeid }}: Params)  {
  console.log(archetypeid);
  let item = await prisma.item.findFirst({
    where: {
      archetypeId: archetypeid,
    },
    include: {
      nfts: true,
    },
  });
  console.log(process.env.NODE_ENV)
  if (!item) {
    return <ItemNotFound archetypeId={archetypeid} />
  }

  const ownersGrouped = await getOwnersGroupedByOwners({archetypeid});
  
  //@ts-ignore
  return (<GenerateItemTable data={item} ownersGrouped={ownersGrouped}
   />

   )
}


