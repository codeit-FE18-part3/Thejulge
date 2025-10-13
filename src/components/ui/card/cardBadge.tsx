import { Icon } from '@/components/ui/icon';
import { calcPayIncreasePercent } from '@/lib/utils/calcPayIncrease';
import { cn } from '@/lib/utils/cn';
import { cardLayout } from './card.styles';
export type CardVariant = 'post' | 'notice';
interface CardBadgeProps {
  variant: CardVariant;
  hourlyPay?: number;
  originalHourlyPay?: number;
}
const CardBadge = ({ variant, hourlyPay, originalHourlyPay }: CardBadgeProps) => {
  if (!hourlyPay || !originalHourlyPay) return;

  const payIncreasePercent = calcPayIncreasePercent(hourlyPay, originalHourlyPay);
  const payIncreaseLabel =
    payIncreasePercent && (payIncreasePercent > 100 ? '100% 이상' : `${payIncreasePercent}%`);
  const badgeColorClass =
    payIncreasePercent == null
      ? ''
      : payIncreasePercent >= 50
        ? 'bg-red-500'
        : payIncreasePercent >= 30
          ? 'bg-red-300'
          : 'bg-red-200';

  return (
    <>
      {payIncreasePercent !== null && (
        <div className={cn(cardLayout.badge({ status: variant }), badgeColorClass)}>
          <span className={cardLayout.badgeText()}>기존 시급 {payIncreaseLabel}</span>
          <Icon
            iconName='arrowUp'
            iconSize='sm'
            bigScreenSize='rg'
            decorative
            className={cardLayout.badgeIcon()}
          />
        </div>
      )}
    </>
  );
};

export default CardBadge;
