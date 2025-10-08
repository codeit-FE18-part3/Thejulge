/* -------------------- 공고 -------------------- */

import { ShopSummary } from './shop';

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

export type PostCard = Notice & ShopSummary & { shopId: string };
