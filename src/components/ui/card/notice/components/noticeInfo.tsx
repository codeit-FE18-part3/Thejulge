import { cardLayout } from '@/components/ui/card/card.styles';
import CardBadge from '@/components/ui/card/cardBadge';
import CardInfo from '@/components/ui/card/cardInfo';
import {
  noticeButton,
  noticeInfoWrapper,
  noticeLabel,
} from '@/components/ui/card/notice/notice.styles';
import { getTime } from '@/lib/utils/dateFormatter';
import { formatNumber } from '@/lib/utils/formatNumber';
import { type NoticeCard, type NoticeVariant } from '@/types/notice';
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

  const { date, startTime, endTime } = getTime(startsAt ?? '', workhour ?? 0);

  return (
    <div className={noticeInfoWrapper()}>
      <ul className='flex flex-col gap-3'>
        {variant === 'notice' && (
          <>
            <li>
              <p className={noticeLabel()}>시급</p>
              <div className={cardLayout.payLayout()}>
                <span className={cardLayout.payText({ className: 'text-heading-s' })}>
                  {formatNumber(hourlyPay ?? 0)}원
                </span>
                <CardBadge
                  variant='notice'
                  hourlyPay={hourlyPay}
                  originalHourlyPay={originalHourlyPay}
                />
              </div>
            </li>
            <CardInfo iconName='calendarClock' ariaLabel='근무시간'>
              {date} {startTime} ~ {endTime} ({workhour}시간)
            </CardInfo>
          </>
        )}
        {variant === 'shop' && (
          <li>
            <NoticeHeader name={name} category={category} className='mt-4' />
          </li>
        )}
        <CardInfo iconName='mapPin' ariaLabel='근무위치'>
          {address1}
        </CardInfo>
        <li className='text-body-l'>{shopDescription}</li>
      </ul>
      <div className={noticeButton()}>{buttonComponent}</div>
    </div>
  );
};
export default NoticeInfo;
