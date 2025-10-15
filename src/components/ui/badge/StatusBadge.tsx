import { Button } from '@/components/ui/button';
import Badge from './Badge';

export type StatusType = 'pending' | 'approved' | 'rejected';

interface StatusBadgeProps {
  status: StatusType;
  variant: 'employer' | 'employee';
  onApprove: () => void;
  onReject: () => void;
}

export default function StatusBadge({ status, variant, onApprove, onReject }: StatusBadgeProps) {
  if (status === 'pending' && variant === 'employer') {
    return (
      <div className='flex w-1/2 flex-col gap-2 md:flex-row'>
        <Button variant='reject' size='md' className='whitespace-nowrap' onClick={onReject}>
          거절하기
        </Button>
        <Button variant='approve' size='md' className='whitespace-nowrap' onClick={onApprove}>
          승인하기
        </Button>
      </div>
    );
  }

  const BADGE_CLASS =
    status === 'pending'
      ? 'bg-green-100 text-green-200'
      : status === 'approved'
        ? 'bg-blue-100 text-blue-200'
        : 'bg-red-100 text-red-400';

  const BADGE_TEXT = status === 'pending' ? '대기중' : status === 'approved' ? '승인 완료' : '거절';

  return <Badge className={BADGE_CLASS}>{BADGE_TEXT}</Badge>;
}
