export interface OLSalesResponse {
  items?: OLSale[] | null;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
export interface OLSale {
  issuedId: number;
  archetypeId: string;
  eventName: string;
  price: number;
  fromUser: string;
  toUser: string;
  date: string;
}
