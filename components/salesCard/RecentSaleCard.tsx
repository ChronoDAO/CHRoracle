"use client";
import styles from "./recentSaleCard.module.scss";
import { HiArrowCircleRight } from "react-icons/hi";

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
    <div className={styles.nft}>
      <div className={styles.main}>
        <div className={styles["nft-issued-number"]}>N° {issuedId}</div>
        <img className={styles.tokenImage} src={imageUrl} alt={itemName} />
        <p className={styles["nft-name"]}>{itemName}</p>
       
          <div className={styles.users}>
            <p>{fromUser}</p>
            <div className={styles.arrowIcon}>
              <HiArrowCircleRight/>
            </div>
            <p>{toUser}</p>
          </div>
       
        <hr />
        <div className={styles.creator}>
          <div className={styles.price}>
            <p>${price} </p>
          </div>
          <div className={styles.date}>
          <ins>◷</ins>
          <p>a few seconds ago...</p>
          {/* <p>{new Date(date).toLocaleString()}</p> */}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default RecentSaleCard;
