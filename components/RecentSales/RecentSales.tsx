import React from 'react';
import RecentSaleCard from "../salesCard/RecentSaleCard";
import FilterCards from "../filterCards/FiterCards";
import styles from "./recentSales.module.scss";

interface NFT {
  id: number;
  composedId: string;
  issuedId: number;
  lootDate: Date | null;
  owner: User | null;
  ownerName: string | null;
  item: Item;
  archetypeId: string | null;
}

interface User {
  id: number;
  name: string;
  nfts: NFT[];
  sales: Sale[];
  purchases: Sale[];
  spent: number;
  sold: number;
  balance: number;
}

interface Sale {
  id: number;
  price: number;
  date: Date;
  fromUser: string;
  toUser: string;
  nft: NFT;
  nftId: string | null;
}

interface Item {
  archetypeId: string;
  name: string;
  description: string | null;
  imageUrl: string;
  floorPrice: number | null;
  maxIssuance: number;
  setName: string | null;
  rarityName: string | null;
  collectionName: string | null;
  optionName: string;
  nfts: NFT[];
}

const RecentSales: React.FC<{ data: Sale[] }> = ({ data }) => {
  
  const handleFilterChange = (selectedFilter: string) => {
    if (selectedFilter !== 'All') {
      data = data.filter(sale => sale.nft.item.name === selectedFilter);
    }
  };

  const formattedSalesData = data.map((sale) => ({
    price: sale.price,
    date: sale.date,
    toUser: sale.toUser,
    fromUser: sale.fromUser,
    issuedId: sale.nft.issuedId,
    itemName: sale.nft.item.name,
    imageUrl: sale.nft.item.imageUrl,
  }));

  return (
    <div className={styles["resent-sales-container"]}>
      <div className={styles["title-container"]}>
        <div className={styles.title}>Recent sales</div>
        <FilterCards onFilterChange={handleFilterChange} />
      </div>
      
      <div className={styles["cards-container"]}>
        {formattedSalesData.map((vente, index) => (
          <RecentSaleCard key={index} {...vente} />
        ))}
      </div>
    </div>
  );
}

export default RecentSales;

