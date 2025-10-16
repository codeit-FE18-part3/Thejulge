import type { NoticeCard, RecentNotice } from '@/types/notice';
import { useCallback, useEffect, useState } from 'react';

const RECENT_KEY = 'thejulge_recent';

// 최근 본 공고 저장
export const useRecentNotice = (notice: NoticeCard) => {
  const handleRecentNotice = useCallback(() => {
    if (!notice) return;

    const current: RecentNotice = {
      id: notice.id,
      shopId: notice.shopId,
      name: notice.name,
      address1: notice.address1,
      imageUrl: notice.imageUrl,
      hourlyPay: notice.hourlyPay,
      startsAt: notice.startsAt,
      workhour: notice.workhour,
      closed: notice.closed,
      originalHourlyPay: notice.originalHourlyPay,
      viewedAt: new Date().toISOString(),
    };

    // 기존 데이터 가져오기
    const stored = localStorage.getItem(RECENT_KEY);
    let recentList: RecentNotice[] = stored ? JSON.parse(stored) : [];

    // 중복 제거 같은 noticeId면 제거
    recentList = recentList.filter(item => item.id !== current.id);

    // 최신 항목 맨 앞에 추가
    recentList.unshift(current);

    // 최대 6개까지만 저장
    if (recentList.length > 6) recentList = recentList.slice(0, 6);

    localStorage.setItem(RECENT_KEY, JSON.stringify(recentList));
  }, [notice]);

  return { handleRecentNotice };
};

// 최근 본 공고 불러오기
export function useRecentNoticeList() {
  const [recentNotices, setRecentNotices] = useState<RecentNotice[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_KEY);
    if (stored) {
      const parsed: RecentNotice[] = JSON.parse(stored);
      setRecentNotices(parsed);
    }
  }, []);

  return { recentNotices };
}
