import ClientPie from "./ClientPie";

const COLORS = ["#0088FE", "#ff7e03", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
interface NFT {
  id: number;
  composedId: string;
  issuedId: number;
  lootDate: Date | null;
  owner: User | null;
  ownerName: string | null;
  item: Item ;
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
    lootDate: nft.lootDate ? new Date(nft.lootDate).toISOString() : '',
  }));

  const archetypeIds = nftsWithSerializedDates.map((nft) => nft.archetypeId).filter((archetypeId) => archetypeId !== null) as string[];

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
  return userInfo
}
export default function UserPie ({ data }: { data: User }) {

  let userInfo = generateUserInfos(data);

  let sumFloorPrice = userInfo.user.nfts
  .map(nft => nft.item?.floorPrice || 0) // Map each nft to its floorPrice (or 0 if undefined)
  .reduce((total, floorPrice) => total + floorPrice, 0); // Sum up the floorPrices

sumFloorPrice = Number(sumFloorPrice.toFixed(2)); // Convert to a fixed number with 2 decimal places

  return (
    <div>
        <div>
          <h1>{data.name}</h1>
        </div>
        <div>
          <h3>
            Balance Purchases/Sales:{" "}
            {Number(data.balance.toFixed(2)).toLocaleString()} $
          </h3>

          <h3>
                Sum of Floor Prices of Owned NFTs:{" "}
                {sumFloorPrice.toLocaleString()} $
              </h3>
          <h3>
                Value Generated on BigTime:{" "}
                {Number(
                  (data.balance + sumFloorPrice).toFixed(2)
                ).toLocaleString()}{" "}
                $
              </h3>
        </div>
        <ClientPie user={userInfo.user} uniqueNFTCount={userInfo.uniqueNFTCount} />
        
      </div>
  );
}