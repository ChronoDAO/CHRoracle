import { Drop, Prisma, PrismaClient, Sale } from "@prisma/client";
import { create } from "domain";
import { OLSale, OLSalesResponse } from "./OpenLootApiTypes/history";

const prisma = new PrismaClient();

let parseOlResponse = (olSale: OLSale) => {
  let sale: Prisma.SaleCreateInput = {
    date: olSale.date,
    price: olSale.price,
    from: {
      connectOrCreate: {
        where: {
          name: olSale.fromUser,
        },
        create: {
          name: olSale.fromUser,
          sold: 5,
        },
      },
    },
    to: {
      connectOrCreate: {
        where: {
          name: olSale.toUser,
        },
        create: {
          name: olSale.toUser,
        },
      },
    },
    nft: {
      connectOrCreate: {
        where: {
          composedId: `[${olSale.issuedId}]${olSale.archetypeId}`,
        },
        create: {
          composedId: `[${olSale.issuedId}]${olSale.archetypeId}`,
          issuedId: olSale.issuedId,
          archetypeId: olSale.archetypeId,
        },
      },
    },
  };
  return sale;
};

let getSalesFromOpenLoot = async (archetypeId: string) => {
  let sales: Prisma.SaleCreateInput[] = [];
  let page = 1;
  let pageSize = 1;

  let olhistoryResponse = await fetch(
    `https://openloot.com/api/v2/market/items/transaction/history?archetypeId=${archetypeId}&page=${page}&pageSize=${pageSize}`
  );

  let olhistory: OLSalesResponse = await olhistoryResponse.json();

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

  console.dir(olHistoryUpsert);

  page = 1;
  pageSize = 1000;

  while (true) {
    let salesResponse = await fetch(
      `https://openloot.com/api/v2/market/items/transaction/history?archetypeId=${archetypeId}&page=${page}&pageSize=${pageSize}`
    );

    // console.dir(salesResponse);
    let OLSales: OLSalesResponse = await salesResponse.json();

    if (!OLSales.items) break;

    let parsedSales = OLSales.items.map(parseOlResponse);
    sales = sales.concat(parsedSales);
    await delay(Math.random() * 1000 + 1000);

    // If the number of returned items is less than the page size, it means we reached the last page
    if (OLSales.items.length < pageSize) break;

    page++;
  }

  return sales;
};

const createSales = async () => {
  let items = await prisma.item.findMany();
  let sales: Prisma.SaleCreateInput[] = [];

  items = [items[10], items[11], items[12], items[13], items[14], items[15]];

  for (const item of items) {
    // console.dir(item);
    let csales = await getSalesFromOpenLoot(item.archetypeId);
    sales = [...sales, ...csales];
    console.log(
      `TSX : ${sales.length} : On ${item.name}  with ${csales.length} transactions`
    );
  }

  console.log("number of sales to proceed : ", sales.length);

  if (!sales) return;

  for (const sale of sales) {
    if (sale.price) {
      await prisma.sale.create({
        data: sale,
      });
      await prisma.user.update({
        //@ts-ignore
        where: { name: sale.from.connectOrCreate.where.name },
        data: {
          balance: { decrement: sale.price },
          sold: { increment: sale.price },
        },
      });
      await prisma.user.update({
        //@ts-ignore
        where: { name: sale.from.connectOrCreate.where.name },
        data: {
          balance: { increment: sale.price },
          spent: { increment: sale.price },
        },
      });
    } else {
      let drop: Prisma.DropCreateInput = sale;
      //@ts-ignore
      delete drop.price,
        //@ts-ignore
        delete drop.from;
      await prisma.drop.create({
        data: drop,
      });
    }

    await prisma.nFT.update({
      where: { composedId: sale.nft?.connectOrCreate?.create.composedId },
      data: {
        //@ts-ignore
        ownerName: sale.to.connectOrCreate.where.name,
      },
    });
  }

  console.log(`${sales.length} Sales created`);
};

createSales();

export default createSales;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
