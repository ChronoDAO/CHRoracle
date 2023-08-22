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

const getTimeDifference = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "a few seconds ago";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
};

const RecentSaleCard: React.FC<TypeItemSales> = ({
  price,
  date,
  toUser,
  fromUser,
  issuedId,
  itemName,
  imageUrl,
}) => {
  const timeDifference = getTimeDifference(new Date(date));
  return (
    <div className={styles.nft}>
      <div className={styles.main}>
        <div className={styles["nft-issued-tag"]}>
          <div className={styles["nft-issued-number"]}>
          # {issuedId}
          </div>
        </div>
        
        <img className={styles.tokenImage} src={imageUrl} alt={itemName} />
        <div className={styles["nft-name"]}>
          {itemName}
        </div>

        <div className={styles.users}>
          <p>{fromUser}</p>
          <div className={styles.arrowIcon}>
            <HiArrowCircleRight />
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
            {timeDifference}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentSaleCard;
