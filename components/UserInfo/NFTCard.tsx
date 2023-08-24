"use client";
import React from "react";
interface NFT {
  id: number;
  composedId: string;
  issuedId: number;
  lootDate: Date | null;
  owner: User | null;
  ownerName: string | null;
  item: Item;
  archetypeId: string;
}
interface User {
  id: number;
  name: string;
  nfts: NFT[];
  spent: number;
  sold: number;
  balance: number;
  drops: any[];
  purchases: any[];
}
interface Item {
  archetypeId: string;
  name: string;
  description: string | null;
  imageUrl: string;
  floorPrice: number;
  maxIssuance: number;
  setName: string | null;
  rarityName: string | null;
  collectionName: string | null;
  optionName: string;
}
interface CardProps {
  totalNFTs: number;
  totalValue: number;
  totalDropNFT: number;
  proportion: number;
  uniqueNFTs: number;
  proportionUni: number;
  user: User;
}

const NFTCard: React.FC<CardProps> = ({
  totalNFTs,
  totalValue,
  totalDropNFT,
  proportion,
  uniqueNFTs,
  proportionUni,
  user,
}) => {
  let sumFloorPrice = user.nfts
    .map((nft) => nft.item?.floorPrice || 0) // Map each nft to its floorPrice (or 0 if undefined)
    .reduce((total, floorPrice) => total + floorPrice, 0); // Sum up the floorPrices

  sumFloorPrice = Number(sumFloorPrice.toFixed(2)); // Convert to a fixed number
  return (
    <>
      <div >
        <ul>
          <li>Total NFTs : {totalNFTs} for around {sumFloorPrice.toLocaleString()} $</li>
          <li>Including {totalDropNFT} looted himself</li>
          <li>and {uniqueNFTs} unique items.</li>
          <li>
            Purchases/Sales balance:
            {Number(user.balance.toFixed(2)).toLocaleString()} $
          </li>
          <li>
            {" "}
            Current Potential Value :
            {Number(
              (user.balance + sumFloorPrice).toFixed(2)
            ).toLocaleString()}{" "}
            $
          </li>
        </ul>
      </div>
    </>
  );
};

export default NFTCard;
