import {
  Drop,
  Item,
  OLHistory,
  Prisma,
  PrismaClient,
  Sale,
} from "@prisma/client";
import { create } from "domain";
import { OLSale, OLSalesResponse } from "../OpenLootApiTypes/history";
import { dir, log } from "console";

const fetch = require("fetch-retry")(global.fetch);

const prisma = new PrismaClient();

let getSalesFromOpenLoot = async (item: any) => {
  let sales: OLSale[] = [];
  let pageSize = 1000;

  let page = Math.floor(item._count.olTransfers / pageSize) + 1;
  log(` current page ${page}`);

  while (true) {
    let salesResponse = await fetch(
      `https://openloot.com/api/v2/market/items/transaction/history?archetypeId=${item.archetypeId}&page=${page}&pageSize=${pageSize}`,
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

    // console.dir(salesResponse);
    let OLSales: OLSalesResponse = await salesResponse.json();

    console.log(`${item.archetypeId} ${OLSales.totalItems}`);

    if (!OLSales.items) break;

    sales = sales.concat(OLSales.items);

    // If the number of returned items is less than the page size, it means we reached the last page
    if (OLSales.items.length < pageSize) break;

    page++;
  }

  return sales;
};

const createSales = async () => {
  let items = await prisma.oLHistory.findMany({
    where: { synced: false },
    select: {
      archetypeId: true,
      _count: {
        select: {
          olTransfers: true,
        },
      },
    },
  });

  let sales: Prisma.SaleCreateInput[] = [];
  let counter = 0;

  for (const item of items) {
    await delay(Math.random() * 1000 + 1500);

    counter++;
    console.log(`${counter} / ${items.length} remaining to sync`);

    // console.dir(item);
    let sales = await getSalesFromOpenLoot(item);

    `SALES : ${sales.length} : On ${item.archetypeId} `;

    console.log("number of sales to proceed : ", sales.length);

    if (!sales) return;

    for (const sale of sales) {
      await prisma.oLTransfer
        .create({
          data: {
            ...sale,
            composedId: `[${sale.issuedId}]${item.archetypeId}-${sale.date}`,
          },
        })
        .catch((e) => "");
    }

    await prisma.oLHistory.update({
      where: { archetypeId: item.archetypeId },
      data: {
        lastSync: new Date(),
        synced: true,
      },
    });
  }
};

createSales();

export default createSales;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
