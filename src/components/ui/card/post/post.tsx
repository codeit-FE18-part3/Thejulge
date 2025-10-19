import { cardLayout, CardStatusVariant } from '@/components/ui/card/card.styles';
import CardBadge from '@/components/ui/card/cardBadge';
import CardImage from '@/components/ui/card/cardImage';
import CardInfo from '@/components/ui/card/cardInfo';
import { getTime } from '@/lib/utils/dateFormatter';
import { formatNumber } from '@/lib/utils/formatNumber';
import { getNoticeStatus } from '@/lib/utils/getNoticeStatus';
import type { PostCard } from '@/types/notice';
import Link from 'next/link';
import { postFrame, postImageDimmed } from './post.styles';

interface PostProps {
  notice: PostCard;
  href: string;
}
const STATUS_LABEL = {
  expired: '지난 공고',
  closed: '공고 마감',
} as const;

const Post = ({ notice, href = '' }: PostProps) => {
  if (!href) return null;
  const { hourlyPay, startsAt, workhour, closed, originalHourlyPay, imageUrl, name, address1 } =
    notice;
  const status = getNoticeStatus(closed, startsAt);
  const { date, startTime, endTime } = getTime(startsAt, workhour);
  const statusVariant: CardStatusVariant = status === 'open' ? 'open' : 'inactive';

  return (
    <Link href={href} className={postFrame()} aria-label={`${name} 공고 상세로 이동`}>
      <CardImage variant='post' src={imageUrl} alt={name}>
        <CardBadge variant='post' hourlyPay={hourlyPay} originalHourlyPay={originalHourlyPay} />
        {status !== 'open' && <div className={postImageDimmed()}>{STATUS_LABEL[status]}</div>}
      </CardImage>
      <h3
        className={cardLayout.heading({
          size: 'sm',
          status: statusVariant,
          className: 'pb-2 pt-4 tablet:pb-4 tablet:pt-6',
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
