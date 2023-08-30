import {Prisma, PrismaClient} from "@prisma/client";

import { OLSalesResponse } from "./OpenLootApiTypes/history";
import {log } from "console";

// fetch-retry can also wrap Node.js's native fetch API implementation:
const fetch = require("fetch-retry")(global.fetch);

const prisma = new PrismaClient();

let getTransferHistoryFromOpenLoot = async (archetypeId: string) => {
  let sales: Prisma.SaleCreateInput[] = [];
  let page = 1;
  let pageSize = 1;

  let olhistoryResponse = await fetch(
    `https://openloot.com/api/v2/market/items/transaction/history?archetypeId=${archetypeId}&page=${page}&pageSize=${pageSize}`,
    {
      retryOn: [429],
      retries: 50,
      //@ts-ignore
      retryDelay: function (attempt, error, response) {
        let nextIntent;
        if (attempt < 6) nextIntent = 30 * 1000;
        else nextIntent = Math.pow(2, attempt) * 1000; // 1000, 2000, 4000
        log(`retry in ${nextIntent / 1000} second`);
        return nextIntent;
      },
    }
  );

  let olhistory: OLSalesResponse = await olhistoryResponse.json();

  let olhistoryOld = await prisma.oLHistory.findUnique({
    where: { archetypeId },
  });

  if (olhistoryOld && olhistory.totalItems == olhistoryOld?.totalItems) {
    console.log(
      `${archetypeId} - nothing to update - last sync : ${olhistoryOld.lastApiPull}`
    );
    await prisma.oLHistory.update({
      where: { archetypeId },
      data: {
        lastApiPull: new Date(),
      },
    });
    return;
  }

  let olHistoryUpsert = await prisma.oLHistory.upsert({
    where: { archetypeId },
    create: {
      archetypeId,
      lastApiPull: new Date(),
      totalItems: olhistory.totalItems,
      synced: false,
    },
    update: {
      totalItems: olhistory.totalItems,
      lastApiPull: new Date(),
      synced: false,
    },
  });

  if (olhistoryOld)
    console.log(
      `${archetypeId}  ${
        olhistory.totalItems - olhistoryOld.totalItems
      } new items detected - last sync : ${olhistoryOld.lastApiPull} `
    );
  else
    console.log(
      `${archetypeId}  ${olhistory.totalItems} items - Frist time tracking`
    );
};

const run = async () => {
  let items = await prisma.oLHistory.findMany({
    orderBy: {
      lastApiPull: "asc",
    },
  });
  let sales: Prisma.SaleCreateInput[] = [];

  for (const item of items) {
    // console.dir(item);
    try {
      let csales = await getTransferHistoryFromOpenLoot(item.archetypeId);
    } catch (error) {
      log(`${item.archetypeId} FAILED TO SYNC`);
    }
    await delay(Math.random() * 1000 + 1000);
  }
};

run();

export default run;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
