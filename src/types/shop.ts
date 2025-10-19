import { User } from './user';

/* -------------------- 가게 -------------------- */
// 가게등록
export interface ShopBase {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}
// 가게정보 조회
export interface Shop extends ShopBase {
  user?: {
    item: User;
    href: string;
  };
}

export type ShopSummary = Pick<ShopBase, 'name' | 'address1' | 'imageUrl' | 'originalHourlyPay'>;

export interface NoticeShopCard {
  shopId: string;
  name: string;
  category: string;
  address1: string;
  imageUrl: string;
  shopDescription: string;
}
