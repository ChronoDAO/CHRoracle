import { PrismaClient } from "@prisma/client";

import sets from "./seeds/set";
import users from "./seeds/users";
import items from "./seeds/items";
import rarities from "./seeds/rarities";
import createSales from "./seeds/sales";

const prisma = new PrismaClient();

async function main() {
  await prisma.category.create({
    data: { name: "Test" },
  });
  await createCollections();
  await createUsers();
  await createRarities();
  await createItems();
  await createSales();
  await createSets();
}

async function createSets() {
  await Promise.all(
    sets.map((c) =>
      prisma.set.create({
        data: c,
      })
    )
  );

  console.log(`${sets.length} Set created`);
}
async function createCollections() {
  await prisma.collection.create({
    data: { name: "BTO" },
  });

  console.log(`Collection BTO created`);
}

async function createRarities() {
  await Promise.all(
    rarities.map((c) =>
      prisma.rarity.create({
        data: c,
      })
    )
  );

  console.log(`${rarities.length} Rarities created`);
}

async function createUsers() {
  await Promise.all(
    users.map((u) =>
      prisma.user.create({
        data: u,
      })
    )
  );

  console.log(`${users.length} Users created`);
}

async function createItems() {
  let i = await items;
  await Promise.all(
    i.map((c) =>
      prisma.item.create({
        data: c,
      })
    )
  );

  console.log(`${i.length} Items created`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
