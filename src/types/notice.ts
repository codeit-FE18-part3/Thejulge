/* -------------------- 공고 -------------------- */

import { ApiResponse, Link, PaginatedResponse } from './api';
import { Shop, ShopSummary } from './shop';

// 공고 등록
export interface NoticeBase {
  hourlyPay: number;
  startsAt: string; // RFC 3339
  workhour: number;
  description: string;
}

// 공고 목록 및 알림 목록
export interface Notice extends NoticeBase {
  id: string;
  closed: boolean;
}

export type CardVariant = 'post' | 'notice';

export type PostCard = Omit<Notice, 'description'> & ShopSummary & { shopId: string };

export type NoticeCard = Notice &
  ShopSummary & {
    shopId: string;
    category: string;
    shopDescription: string;
  };

export interface NoticeItemResponse {
  item: Notice & {
    shop: {
      item: Shop;
      href: string;
    };
  };
  links: Link[];
}

export type NoticeListResponse = PaginatedResponse & ApiResponse<NoticeItemResponse>;
export type NoticeVariant = 'notice' | 'shop';
