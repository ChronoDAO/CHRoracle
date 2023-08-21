import styles from './recentSaleCard.module.scss';

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
  item: Item ;
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
  nft: NFT ;
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
      <img src={imageUrl} alt={itemName} className={styles.imageDeVente} />
      <div>
        <p><strong>Article :</strong> {itemName}</p>
        <p><strong>Prix :</strong> {price}</p>
        <p><strong>Date :</strong> {new Date(date).toLocaleDateString()}</p>
        <p><strong>De :</strong> {fromUser}</p>
        <p><strong>Vers :</strong> {toUser}</p>
      </div>
    </div>
  );
};

export default RecentSaleCard;