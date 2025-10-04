import { User } from './user';

export interface Notice {
  id: string;
  hourlyPay: number;
  description: string;
  startsAt: string;
  workhour: number;
  closed: boolean;
  user?: {
    item: User;
    href?: string;
  };
}
