import Icon from '@/components/ui/icon/icon';

export interface ResultBadgeProps {
  result: 'accepted' | 'rejected' | null;
}

// null은 객체에서 빼고, default 색상을 따로 둔다
const ICON_COLORS: Record<'accepted' | 'rejected', string> = {
  accepted: 'bg-blue-200',
  rejected: 'bg-red-400',
};
const DEFAULT_COLOR = 'bg-gray-300';

export default function ResultBadge({ result }: ResultBadgeProps) {
  const color = result ? ICON_COLORS[result] : DEFAULT_COLOR;

  return (
    <Icon
      iconName='resultBadge'
      className={`${color} h-[5px] w-[5px]`}
      ariaLabel={
        result === 'accepted' ? '승인 상태' : result === 'rejected' ? '거절 상태' : '대기 상태'
      }
    />
  );
}
