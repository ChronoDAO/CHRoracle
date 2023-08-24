import ClientPie from "./ClientPie";
import NFTCard from "./NFTCard";
import styles from "./userCard.module.scss";
interface NFT {
  id: number;
  composedId: string;
  issuedId: number;
  lootDate: any | null;
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
const generateUserInfos = (user: User) => {
  //  // Convertir les dates en chaînes ISO et gérer les valeurs null
  const purchasesWithSerializedDates = user.purchases.map((purchase) => ({
    ...purchase,
    date: purchase.date.toISOString(),
  }));

  const dropsWithSerializedDates = user.drops.map((drop) => ({
    ...drop,
    date: drop.date.toISOString(),
  }));

  const nftsWithSerializedDates = user.nfts.map((nft) => ({
    ...nft,
    lootDate: nft.lootDate ? new Date(nft.lootDate).toISOString() : "",
  }));

  const archetypeIds = nftsWithSerializedDates
    .map((nft) => nft.archetypeId)
    .filter((archetypeId) => archetypeId !== null) as string[];

  const uniqueArchetypeIds = [...new Set(archetypeIds)];
  const uniqueNFTCount = uniqueArchetypeIds.length;
  let userInfo = {
    user: {
      ...user,
      purchases: purchasesWithSerializedDates,
      drops: dropsWithSerializedDates,
      nfts: nftsWithSerializedDates,
    },
    uniqueNFTCount,
  };
  return userInfo;
};
export default function UserCard({ data }: { data: User }) {
  let userInfo = generateUserInfos(data);

  const proportionDrop = parseFloat(
    ((userInfo.user.drops.length / userInfo.user.nfts.length) * 100).toFixed(2)
  );
  const proportionUni = parseFloat(
    ((userInfo.uniqueNFTCount / userInfo.user.nfts.length) * 100).toFixed(2)
  );
  return (
    <>
      <h1 className={styles.title}>{data.name}'s Stats</h1>
      <div className={styles.container}>
        <NFTCard
          totalNFTs={userInfo.user.nfts.length}
          totalValue={parseFloat(userInfo.user.balance.toFixed(2))}
          totalDropNFT={userInfo.user.drops.length}
          proportion={proportionDrop}
          uniqueNFTs={userInfo.uniqueNFTCount}
          proportionUni={proportionUni}
          //@ts-ignore
          user={userInfo.user}
        />
        {/* <ClientPie
          user={userInfo.user}
          uniqueNFTCount={userInfo.uniqueNFTCount}
        /> */}
      </div>
    </>
  );
}
