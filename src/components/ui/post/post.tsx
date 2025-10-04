import { Icon } from '@/components/ui/icon';
import { calcPayIncreasePercent } from '@/lib/utils/calcPayIncrease';
import { cn } from '@/lib/utils/cn';
import { formatNumber } from '@/lib/utils/formatNumber';
import { getTime } from '@/lib/utils/getTime';
import { NoticeDetail } from '@/types/notice';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import {
  badgeIcon,
  badgeText,
  postBadge,
  postHeading,
  postImageDimmed,
  postImageWrapper,
  postWrapper,
  workInfoIcon,
  workInfoLayout,
  workInfoText,
  workPayLayout,
  type PostStatusVariant,
} from './post.styles';
type NoticeStatus = 'open' | 'expired' | 'closed';
interface PostProps {
  notice: NoticeDetail;
  link: string;
}
const STATUS_LABEL = {
  expired: '지난 공고',
  closed: '공고 마감',
} as const;

const hasShiftStarted = (startsAt: string) => Date.now() >= new Date(startsAt).getTime();

const getNoticeStatus = (closed: boolean, startsAt: string): NoticeStatus => {
  if (closed) return 'closed';
  return hasShiftStarted(startsAt) ? 'expired' : 'open';
};
const Post = ({ notice, link }: PostProps) => {
  const { hourlyPay, startsAt, workhour, closed, shop } = notice;
  const status = useMemo(() => getNoticeStatus(closed, startsAt), [closed, startsAt]);
  const payIncreasePercent = useMemo(
    () => calcPayIncreasePercent(hourlyPay, shop?.item.originalHourlyPay ?? 0),
    [hourlyPay, shop?.item.originalHourlyPay]
  );

  if (!shop)
    return <div className='text-center text-heading-s text-gray-400'>가게 정보가 없습니다.</div>;

  const { item } = shop;
  const { date, startTime, endTime } = getTime(startsAt, workhour);
  const statusVariant: PostStatusVariant = status === 'open' ? 'open' : 'inactive';
  const payIncreaseLabel =
    payIncreasePercent && (payIncreasePercent > 100 ? '100% 이상' : `${payIncreasePercent}%`);
  return (
    <Link href={link} className={postWrapper()}>
      <div className={postImageWrapper()}>
        <Image src={item.imageUrl} alt={`${item.name} 가게 이미지`} fill className='object-cover' />
        {status !== 'open' && <div className={postImageDimmed()}>{STATUS_LABEL[status]}</div>}
      </div>
      <div className={cn('mt-4', 'tablet:mt-6')}>
        <ul className='flex flex-col flex-nowrap gap-2'>
          <li className={postHeading({ status: statusVariant })}>{item.name}</li>
          <li className={workInfoLayout()}>
            <Icon
              iconName='clock'
              iconSize='sm'
              ariaLabel='근무시간'
              className={workInfoIcon({ status: statusVariant })}
            />
            <p className={workInfoText({ status: statusVariant })}>
              {date} {startTime} ~ {endTime} ({workhour}시간)
            </p>
          </li>
          <li className={workInfoLayout()}>
            <Icon
              iconName='map'
              iconSize='sm'
              ariaLabel='근무위치'
              className={workInfoIcon({ status: statusVariant })}
            />
            <p className={workInfoText({ status: statusVariant })}>{item.address1}</p>
          </li>
        </ul>
        <div className={workPayLayout()}>
          <span className={postHeading({ status: statusVariant, className: 'w-full' })}>
            {formatNumber(hourlyPay)}원
          </span>
          {payIncreasePercent !== null && (
            <div className={postBadge({ status: statusVariant })}>
              <span className={badgeText({ status: statusVariant })}>
                기존 시급 {payIncreaseLabel}
              </span>
              <Icon
                iconName='arrowUp'
                iconSize='sm'
                bigScreenSize='rg'
                ariaLabel='시급정보'
                className={badgeIcon({ status: statusVariant })}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
export default Post;
