import { cardLayout } from '@/components/ui/card/card.styles';
import { NoticeVariant } from '@/components/ui/card/notice/notice';
import {
  badgeText,
  noticeButton,
  noticeInfoWrapper,
  noticeLabel,
  payBadge,
} from '@/components/ui/card/notice/notice.styles';
import { Icon } from '@/components/ui/icon';
import { calcPayIncreasePercent } from '@/lib/utils/calcPayIncrease';
import { getTime } from '@/lib/utils/dateFormatter';
import { formatNumber } from '@/lib/utils/formatNumber';
import { NoticeCard } from '@/types/notice';
import { ReactNode } from 'react';
import NoticeHeader from './noticeHeader';

interface NoticeInfoProps<T extends Partial<NoticeCard>> {
  value: T;
  variant: NoticeVariant;
  buttonComponent: ReactNode;
}

const NoticeInfo = <T extends Partial<NoticeCard>>({
  value,
  variant,
  buttonComponent,
}: NoticeInfoProps<T>) => {
  const {
    name,
    category,
    hourlyPay,
    originalHourlyPay,
    startsAt,
    workhour,
    address1,
    shopDescription,
  } = value;
  const payIncreasePercent = calcPayIncreasePercent(hourlyPay ?? 0, originalHourlyPay ?? 0);
  const { date, startTime, endTime } = getTime(startsAt ?? '', workhour ?? 0);
  const payIncreaseLabel =
    payIncreasePercent && (payIncreasePercent > 100 ? '100% 이상' : `${payIncreasePercent}%`);
  return (
    <div className={noticeInfoWrapper()}>
      <ul className='flex flex-col gap-3'>
        {variant === 'notice' && (
          <>
            <li>
              <p className={noticeLabel()}>시급</p>
              <div className={cardLayout.payLayout()}>
                <span className='text-heading-s font-bold tracking-wide'>
                  {formatNumber(hourlyPay ?? 0)}원
                </span>
                {payIncreasePercent !== null && (
                  <div className={payBadge()}>
                    <span className={badgeText()}>기존 시급 {payIncreaseLabel}</span>
                    <Icon
                      iconName='arrowUp'
                      iconSize='sm'
                      bigScreenSize='rg'
                      decorative
                      className='self-start bg-white'
                    />
                  </div>
                )}
              </div>
            </li>
            <li className={cardLayout.infoLayout()}>
              <Icon iconName='clock' iconSize='sm' ariaLabel='근무시간' className='bg-red-300' />
              <p className={cardLayout.info()}>
                {date} {startTime} ~ {endTime} ({workhour}시간)
              </p>
            </li>
          </>
        )}
        {variant === 'shop' && (
          <li>
            <NoticeHeader name={name} category={category} className='mt-4' />
          </li>
        )}
        <li className={cardLayout.infoLayout()}>
          <Icon iconName='map' iconSize='sm' ariaLabel='근무위치' className='bg-red-300' />
          <p className={cardLayout.info()}>{address1}</p>
        </li>
        <li className='text-body-l'>{shopDescription}</li>
      </ul>
      <div className={noticeButton()}>{buttonComponent}</div>
    </div>
  );
};
export default NoticeInfo;
