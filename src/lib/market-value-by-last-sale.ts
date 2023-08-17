import prisma from "./prisma";

export const marketValueByFloorPrice = async () => {
  const nftsWithLastSale = await prisma.nFT.findMany({
    include: {
      sales: {
        orderBy: {
          id: "desc",
        },
        take: 1,
      },
    },
  });

  let sumPriceNfts = 0;

  nftsWithLastSale.forEach((nft) => {
    if (nft.sales && nft.sales[0]) {
      sumPriceNfts += nft.sales[0].price;
    }
  });

  const totalNFT = nftsWithLastSale.length;

  return {
    sumPriceNfts: sumPriceNfts,
    totalNFT: totalNFT,
  };
};
