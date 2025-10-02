import Icon from '@/components/ui/icon/icon';

export interface ResultBadgeProps {
  result: 'accepted' | 'rejected';
}
const ICON_COLORS: Record<ResultBadgeProps['result'], string> = {
  accepted: 'bg-blue-200',
  rejected: 'bg-red-400',
};

export default function ResultBadge({ result }: ResultBadgeProps) {
  return (
    <Icon
      iconName='resultBadge'
      iconSize='x-sm'
      className={ICON_COLORS[result]}
      ariaLabel={result === 'accepted' ? '승인 상태' : '거절 상태'}
    />
  );
}
