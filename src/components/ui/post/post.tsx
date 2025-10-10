import { cardLayout, CardStatusVariant } from '@/components/ui/card/card.styles';
import { Icon } from '@/components/ui/icon';
import { calcPayIncreasePercent } from '@/lib/utils/calcPayIncrease';
import { cn } from '@/lib/utils/cn';
import { getTime } from '@/lib/utils/dateFormatter';
import { formatNumber } from '@/lib/utils/formatNumber';
import { getNoticeStatus } from '@/lib/utils/getNoticeStatus';
import type { PostCard } from '@/types/notice';
import Image from 'next/image';
import Link from 'next/link';
import {
  badgeIcon,
  badgeText,
  payBadge,
  payLayout,
  postFrame,
  postImageDimmed,
  postImageWrapper,
} from './post.styles';

interface PostProps {
  notice: PostCard;
}
const STATUS_LABEL = {
  expired: '지난 공고',
  closed: '공고 마감',
} as const;

const Post = ({ notice }: PostProps) => {
  const {
    hourlyPay,
    startsAt,
    workhour,
    closed,
    originalHourlyPay,
    imageUrl,
    name,
    address1,
    shopId,
  } = notice;
  const status = getNoticeStatus(closed, startsAt);
  const payIncreasePercent = calcPayIncreasePercent(hourlyPay, originalHourlyPay);
  const { date, startTime, endTime } = getTime(startsAt, workhour);
  const statusVariant: CardStatusVariant = status === 'open' ? 'open' : 'inactive';
  const payIncreaseLabel =
    payIncreasePercent && (payIncreasePercent > 100 ? '100% 이상' : `${payIncreasePercent}%`);
  const href = `/notices/${shopId}`;

  return (
    <Link href={href} className={postFrame()} aria-label={`${name} 공고 상세로 이동`}>
      <div className={postImageWrapper()}>
        <Image
          src={imageUrl}
          alt={`${name} 가게 이미지`}
          fill
          sizes='(max-width: 744px) 120px, 160px'
          className='object-cover'
        />
        {status !== 'open' && <div className={postImageDimmed()}>{STATUS_LABEL[status]}</div>}
      </div>
      <div className={cn('mt-4', 'tablet:mt-6')}>
        <ul className='flex flex-col flex-nowrap gap-2'>
          <li className={cardLayout.heading({ size: 'sm', status: statusVariant })}>{name}</li>
          <li className={cardLayout.infoLayout()}>
            <Icon
              iconName='clock'
              iconSize='sm'
              ariaLabel='근무시간'
              className={cardLayout.infoIcon({ status: statusVariant })}
            />
            <p className={cardLayout.info({ status: statusVariant })}>
              {date} {startTime} ~ {endTime} ({workhour}시간)
            </p>
          </li>
          <li className={cardLayout.infoLayout()}>
            <Icon
              iconName='map'
              iconSize='sm'
              ariaLabel='근무위치'
              className={cardLayout.infoIcon({ status: statusVariant })}
            />
            <p className={cardLayout.info({ status: statusVariant })}>{address1}</p>
          </li>
        </ul>
        <div className={payLayout()}>
          <span
            className={cardLayout.heading({
              size: 'sm',
              status: statusVariant,
              className: 'w-full tracking-wide',
            })}
          >
            {formatNumber(hourlyPay)}원
          </span>
          {payIncreasePercent !== null && (
            <div className={payBadge({ status: statusVariant })}>
              <span className={badgeText({ status: statusVariant })}>
                기존 시급 {payIncreaseLabel}
              </span>
              <Icon
                iconName='arrowUp'
                iconSize='sm'
                bigScreenSize='rg'
                decorative
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
