'use client';
import styles from "./recentSaleCard.module.scss";

type TypeItemSales = {
  price: number;
  date: Date;
  toUser: string;
  fromUser: string;
  issuedId: number;
  itemName: string;
  imageUrl: string;
};

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
  from: User;
  to: User;
  nft: NFT;
  nftId: string | null;
}

interface Item {
  archetypeId: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  floorPrice: number | null;
  maxIssuance: number;
  setName: string | null;
  rarityName: string | null;
  collectionName: string | null;
  optionName: string;
  nfts: NFT[];
}

const RecentSaleCard: React.FC<TypeItemSales> = ({
  price,
  date,
  toUser,
  fromUser,
  issuedId,
  itemName,
  imageUrl,
}) => {
  return (
    <div className={styles.itemSales}>
      <div className={styles.cardHeader}>
        <p className={styles.cardTitle}>
          {itemName} #{issuedId}
        </p>
        <img src={imageUrl} alt={itemName} className={styles.imageDeVente} />
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardText}>
          <strong>From:</strong> {fromUser}{" "}
        </p>
        <p>
          <strong>To:</strong> {toUser}
        </p>
        <p className={styles.cardText}>
          <strong>Price:</strong> {price}
        </p>
        <p className={styles.cardText}>
          <strong>Date/Time:</strong> {new Date(date).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default RecentSaleCard;
