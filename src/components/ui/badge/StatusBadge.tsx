import Badge from './Badge';

export type StatusType = 'pending' | 'accepted' | 'rejected';

interface StatusBadgeProps {
  status: StatusType;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const BADGE_CLASS =
    status === 'pending'
      ? 'bg-green-100 text-green-200'
      : status === 'accepted'
        ? 'bg-blue-100 text-blue-200'
        : 'bg-red-100 text-red-400';

  const BADGE_TEXT = status === 'pending' ? '대기중' : status === 'accepted' ? '승인 완료' : '거절';

  return <Badge className={BADGE_CLASS}>{BADGE_TEXT}</Badge>;
}
