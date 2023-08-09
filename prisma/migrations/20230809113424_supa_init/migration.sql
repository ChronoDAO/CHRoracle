-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "spent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sold" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFT" (
    "id" SERIAL NOT NULL,
    "composedId" TEXT NOT NULL,
    "issuedId" INTEGER NOT NULL,
    "lootDate" TIMESTAMP(3),
    "ownerName" TEXT,
    "archetypeId" TEXT,

    CONSTRAINT "NFT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "archetypeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "floorPrice" DOUBLE PRECISION,
    "maxIssuance" INTEGER NOT NULL,
    "setName" TEXT,
    "rarityName" TEXT,
    "collectionName" TEXT,
    "optionName" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("archetypeId")
);

-- CreateTable
CREATE TABLE "Category" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Rarity" (
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Collection" (
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Set" (
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "fromUser" TEXT NOT NULL,
    "toUser" TEXT NOT NULL,
    "nftId" TEXT,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drop" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "toUser" TEXT NOT NULL,
    "nftId" INTEGER,

    CONSTRAINT "Drop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OLHistory" (
    "archetypeId" TEXT NOT NULL,
    "totalItems" INTEGER NOT NULL,
    "lastApiPull" TIMESTAMP(3),
    "lastSync" TIMESTAMP(3),
    "synced" BOOLEAN NOT NULL,

    CONSTRAINT "OLHistory_pkey" PRIMARY KEY ("archetypeId")
);

-- CreateTable
CREATE TABLE "OLTransfer" (
    "id" SERIAL NOT NULL,
    "composedId" TEXT NOT NULL,
    "issuedId" INTEGER NOT NULL,
    "eventName" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "fromUser" TEXT NOT NULL,
    "toUser" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "archetypeId" TEXT,

    CONSTRAINT "OLTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "NFT_composedId_key" ON "NFT"("composedId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_archetypeId_key" ON "Item"("archetypeId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rarity_name_key" ON "Rarity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_key" ON "Collection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Set_name_key" ON "Set"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OLTransfer_composedId_key" ON "OLTransfer"("composedId");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToItem_AB_unique" ON "_CategoryToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToItem_B_index" ON "_CategoryToItem"("B");

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_ownerName_fkey" FOREIGN KEY ("ownerName") REFERENCES "User"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_archetypeId_fkey" FOREIGN KEY ("archetypeId") REFERENCES "Item"("archetypeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_setName_fkey" FOREIGN KEY ("setName") REFERENCES "Set"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_rarityName_fkey" FOREIGN KEY ("rarityName") REFERENCES "Rarity"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_collectionName_fkey" FOREIGN KEY ("collectionName") REFERENCES "Collection"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_fromUser_fkey" FOREIGN KEY ("fromUser") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_toUser_fkey" FOREIGN KEY ("toUser") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFT"("composedId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drop" ADD CONSTRAINT "Drop_toUser_fkey" FOREIGN KEY ("toUser") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drop" ADD CONSTRAINT "Drop_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFT"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OLTransfer" ADD CONSTRAINT "OLTransfer_archetypeId_fkey" FOREIGN KEY ("archetypeId") REFERENCES "OLHistory"("archetypeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToItem" ADD CONSTRAINT "_CategoryToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToItem" ADD CONSTRAINT "_CategoryToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("archetypeId") ON DELETE CASCADE ON UPDATE CASCADE;
