import ClientPie from "./ClientPie";
import NFTCard from "./NFTCard";
import styles from "./playerCard.module.scss";

interface NFT {
  id: number;
  composedId: string;
  issuedId: number;
  lootDate: any | null;
  owner: Player | null;
  ownerName: string | null;
  item: Item;
  archetypeId: string;
}

interface Player {
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

const generatePlayerInfos = (player: Player) => {
  // Convertir les dates en chaînes ISO et gérer les valeurs null
  const purchasesWithSerializedDates = player.purchases.map((purchase) => ({
    ...purchase,
    date: purchase.date.toISOString(),
  }));

  const dropsWithSerializedDates = player.drops.map((drop) => ({
    ...drop,
    date: drop.date.toISOString(),
  }));

  const nftsWithSerializedDates = player.nfts.map((nft) => ({
    ...nft,
    lootDate: nft.lootDate ? new Date(nft.lootDate).toISOString() : "",
  }));

  const archetypeIds = nftsWithSerializedDates
    .map((nft) => nft.archetypeId)
    .filter((archetypeId) => archetypeId !== null) as string[];

  const uniqueArchetypeIds = [...new Set(archetypeIds)];
  const uniqueNFTCount = uniqueArchetypeIds.length;
  let playerInfo = {
    player: {
      ...player,
      purchases: purchasesWithSerializedDates,
      drops: dropsWithSerializedDates,
      nfts: nftsWithSerializedDates,
    },
    uniqueNFTCount,
  };
  return playerInfo;
};

export default function PlayerCard({ data }: { data: Player }) {
  let playerInfo = generatePlayerInfos(data);

  const proportionDrop = parseFloat(
    ((playerInfo.player.drops.length / playerInfo.player.nfts.length) * 100).toFixed(2)
  );
  const proportionUni = parseFloat(
    ((playerInfo.uniqueNFTCount / playerInfo.player.nfts.length) * 100).toFixed(2)
  );

  return (
    <>
      <h1 className={styles.title}>{data.name}'s Stats</h1>
      <div className={styles.container}>
        <NFTCard
          totalNFTs={playerInfo.player.nfts.length}
          totalValue={parseFloat(playerInfo.player.balance.toFixed(2))}
          totalDropNFT={playerInfo.player.drops.length}
          proportion={proportionDrop}
          uniqueNFTs={playerInfo.uniqueNFTCount}
          proportionUni={proportionUni}
          //@ts-ignore
          player={playerInfo.player}
        />
        {/* <ClientPie
          player={playerInfo.player}
          uniqueNFTCount={playerInfo.uniqueNFTCount}
        />  */}
      </div>
    </>
  );
}
