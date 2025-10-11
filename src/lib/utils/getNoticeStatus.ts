type NoticeStatus = 'open' | 'expired' | 'closed';
export const hasShiftStarted = (startsAt: string) => Date.now() >= new Date(startsAt).getTime();

export const getNoticeStatus = (closed: boolean, startsAt: string): NoticeStatus => {
  if (closed) return 'closed';
  return hasShiftStarted(startsAt) ? 'expired' : 'open';
};
