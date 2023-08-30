import { Drop, OLTransfer, Prisma, PrismaClient, Sale } from "@prisma/client";
import { create } from "domain";
import { OLSale, OLSalesResponse } from "./OpenLootApiTypes/history";
import { dir } from "console";

const prisma = new PrismaClient();

let prepareSale = (olSale: OLTransfer) => {
  let sale: Prisma.SaleCreateInput = {
    //@ts-ignore
    date: new Date(parseInt(olSale.date)),
    //@ts-ignore
    price: olSale.price,
    from: {
      connectOrCreate: {
        where: {
          name: olSale.fromUser,
        },
        create: {
          name: olSale.fromUser,
          sold: 0,
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

const createSales = async () => {
  let transfers = await prisma.oLTransfer.findMany({
    orderBy: {
      date: "asc",
    },
    take: 1,
  });

  let salesToProcessed = await prisma.oLTransfer.count({
    
  });

  let salesProcesed = await prisma.oLTransfer.count({
    
  });

  for (const transfer of transfers) {
    // console.dir(item);
    let sale = prepareSale(transfer);

    console.dir(sale);

    if (sale.price) {
      await prisma.sale.create({
        data: sale,
      });
      await prisma.user.update({
        //@ts-ignore
        where: { name: transfer.fromUser },
        data: {
          balance: { increment: sale.price },
          sold: { increment: sale.price },
        },
      });
      await prisma.user.update({
        //@ts-ignore
        where: { name: transfer.toUser },
        data: {
          balance: { decrement: sale.price },
          spent: { increment: sale.price },
        },
      });
    } else {
      let drop: Prisma.DropCreateInput = sale;
      //@ts-ignore
      delete drop.price,
        //@ts-ignore
        delete drop.from,
        await prisma.drop.create({
          data: drop,
        });
    }

    let updatedNFTOwner = await prisma.nFT.update({
      where: { composedId: `[${transfer.issuedId}]${transfer.archetypeId}` },
      data: {
        ownerName: transfer.toUser,
      },
    });

    dir(updatedNFTOwner);

    await prisma.oLTransfer.update({
      where: {
        id: transfer.id,
      },
      data: {
        processed: true,
      },
    });
    salesProcesed++;
    console.log(
      `number of sales processed :  ${salesProcesed} / ${salesToProcessed} remaining`
    );
  }
};

createSales();

export default createSales;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
