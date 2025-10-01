import { User } from './user';

export interface Shop {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  user?: {
    item: User;
    href?: string;
  };
}
