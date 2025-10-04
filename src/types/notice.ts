/* -------------------- 공고 -------------------- */

import { Shop } from './shop';

// 공고 등록
export interface NoticeBase {
  hourlyPay: number;
  startsAt: string; // RFC 3339
  workhour: number;
  description: string;
}

// 공고 목록 및 알림 목록 조회
export interface Notice extends NoticeBase {
  id: string;
  closed: boolean;
}

// 공고 조회 , 특정 공고 조회
export interface NoticeDetail extends Notice {
  shop?: {
    item: Shop;
    href: string;
  };
  currentUserApplication?: {
    item: {
      id: string;
      status: ApplicationStatus;
      createdAt: string;
    };
  };
}
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'canceled';
