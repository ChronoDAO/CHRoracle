import prisma from "./prisma";

export const marketValueByFloorPrice = async () => {
  const items = await prisma.item.findMany({
    include: {
      nfts: true,
    },
  });

  let sumNftsFloorPrice = 0;
  let totalNFTs = 0;
  items.forEach((item) => {
    totalNFTs += item.nfts.length;
    if (item.floorPrice) {
      sumNftsFloorPrice += item.floorPrice * item.nfts.length;
    }
  });

  return {
    sumNftsFloorPrice: sumNftsFloorPrice,
    totalNFTs: totalNFTs,
  };
};
