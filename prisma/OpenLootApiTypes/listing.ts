export interface OLItemsResponse {
  items: OLItem[];
  pageSize: number;
  currentPage: number;
  totalItems: number;
}

export interface OLItem {
  minPrice: number;
  metadata: Metadata;
}
interface Metadata {
  archetypeId: string;
  name: string;
  description: string;
  tags?: string[] | null;
  rarity: string;
  imageUrl: string;
  collection: string;
  optionName: string;
  gameId: string;
  archetypeParams: string;
  maxIssuance: number;
  updatedAt: string;
  createdAt: string;
  game: Game;
}
interface Game {
  id: string;
  name: string;
  description: string;
  status: string;
  extra: Extra;
  createdAt: string;
  updatedAt: string;
  version: number;
  slug: string;
}
interface Extra {
  developer: string;
  discordUrl: string;
  supportUrl: string;
  twitterUrl: string;
  itemCategories?: ItemCategoriesEntity[] | null;
  officialWebsite: string;
}
interface ItemCategoriesEntity {
  category: string;
  displayName: string;
}
