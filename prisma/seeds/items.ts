import { Prisma } from "@prisma/client";
import { create } from "domain";

import { OLItemsResponse, OLItem } from "../OpenLootApiTypes/listing";

// https://openloot.com/api/v2/market/listings?onSale=false&page=1&sort=name%3Aasc&pageSize=100
// https://openloot.com/api/v2/market/listings?onSale=true&page=1&sort=name%3Aasc&pageSize=250
let parseOlResponse = (i: OLItem) => {
  return {
    name: i.metadata.name,
    archetypeId: i.metadata.archetypeId,
    maxIssuance: i.metadata.maxIssuance,
    optionName: i.metadata.optionName,
    imageUrl: i.metadata.imageUrl,
    collectionName: i.metadata.collection,
    floorPrice: i.minPrice,
    rarityName: i.metadata.rarity,
    //    categories : {
    //     create : i.metadata.tags?.map(t => {name : t})
    //   }
  };
};

let parseOlResponseUnlisted = (i: OLItem) => {
  return {
    name: i.metadata.name,
    maxIssuance: i.metadata.maxIssuance,
    optionName: i.metadata.optionName,
    rarityName: i.metadata.rarity,
  };
};

let getItemsFromOpenLoot = (async function () {
  let itemsResponseP1 = await fetch(
    "https://openloot.com/api/v2/market/listings?onSale=true&page=1&sort=name%3Aasc&pageSize=250"
  );
  let olItemsP1: OLItemsResponse = await itemsResponseP1.json();
  let itemsP1 = olItemsP1.items.map(parseOlResponse);

  let itemsResponseP2 = await fetch(
    "https://openloot.com/api/v2/market/listings?onSale=true&page=2&sort=name%3Aasc&pageSize=250"
  );
  let olItemsP2: OLItemsResponse = await itemsResponseP2.json();
  let itemsP2 = olItemsP2.items.map(parseOlResponse);

  let itemsResponseUnlisted = await fetch(
    "https://openloot.com/api/v2/market/listings?onSale=true&page=2&sort=name%3Aasc&pageSize=250"
  );
  let olItemsUnlisted: OLItemsResponse = await itemsResponseUnlisted.json();
  let itemsUnlisted = olItemsUnlisted.items.map(parseOlResponseUnlisted);

  return [...itemsP1, ...itemsP2];
})();

export default getItemsFromOpenLoot;
// export default items;
