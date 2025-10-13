import { cardLayout, CardStatusVariant } from '@/components/ui/card/card.styles';
import CardBadge from '@/components/ui/card/cardBadge';
import CardInfo from '@/components/ui/card/cardInfo';
import { getTime } from '@/lib/utils/dateFormatter';
import { formatNumber } from '@/lib/utils/formatNumber';
import { getNoticeStatus } from '@/lib/utils/getNoticeStatus';
import type { PostCard } from '@/types/notice';
import Image from 'next/image';
import Link from 'next/link';
import { postFrame, postImageDimmed, postImageWrapper } from './post.styles';

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
  const { date, startTime, endTime } = getTime(startsAt, workhour);
  const statusVariant: CardStatusVariant = status === 'open' ? 'open' : 'inactive';
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
        <CardBadge variant='post' hourlyPay={hourlyPay} originalHourlyPay={originalHourlyPay} />
        {status !== 'open' && <div className={postImageDimmed()}>{STATUS_LABEL[status]}</div>}
      </div>
      <h3
        className={cardLayout.heading({
          size: 'sm',
          status: statusVariant,
          className: 'pt-4 pb-2 tablet:pt-6 tablet:pb-4',
        })}
      >
        {name}
      </h3>
      <ul className='flex flex-col flex-nowrap gap-2'>
        <CardInfo iconName='calendarClock' ariaLabel='근무시간' status={statusVariant}>
          {date} {startTime} ~ {endTime} ({workhour}시간)
        </CardInfo>
        <CardInfo iconName='mapPin' ariaLabel='근무위치' status={statusVariant}>
          {address1}
        </CardInfo>
        <CardInfo iconName='coins' ariaLabel='시급' status={statusVariant}>
          시급 {''}
          <span className={cardLayout.payText({ status: statusVariant })}>
            {formatNumber(hourlyPay)}원
          </span>
        </CardInfo>
      </ul>
    </Link>
  );
};
export default Post;
