export interface RegisterFormData {
  name: string;
  category?: string;
  address1?: string;
  address2: string;
  originalHourlyPay: number | string;
  description?: string;
  image: File | null;
  imageUrl?: string;
}

export interface ShopItem {
  id: string;
  name: string;
  category: string;
  address1: string;
  imageUrl: string;
  originalHourlyPay: number;
  description: string;
}

export interface ShopResponse {
  item: ShopItem;
}

export interface NoticeItem {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  closed: boolean;
}

export interface NoticeResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: { item: NoticeItem }[];
}
