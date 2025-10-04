import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
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

interface PostProps {
  status?: 'open' | 'expired' | 'closed';
}
const STATUS_LABEL = {
  expired: '지난 공고',
  closed: '공고 마감',
} as const;

const Post = ({ status = 'expired' }: PostProps) => {
  const statusVariant: PostStatusVariant = status === 'open' ? 'open' : 'inactive';
  return (
    <div className={postWrapper()}>
      <div className={postImageWrapper()}>
        <Image src='https://picsum.photos/200/300' alt='가게이미지' fill className='object-cover' />
        {status !== 'open' && <div className={postImageDimmed()}>{STATUS_LABEL[status]}</div>}
      </div>
      <div className={cn('mt-4', 'tablet:mt-6')}>
        <ul className='flex flex-col flex-nowrap gap-2'>
          <li className={postHeading({ status: statusVariant })}>도토리 식당</li>
          <li className={workInfoLayout()}>
            <Icon
              iconName='clock'
              iconSize='sm'
              ariaLabel='근무시간'
              className={workInfoIcon({ status: statusVariant })}
            />
            <p className={workInfoText({ status: statusVariant })}>
              2023-01-02 15:00~18:00 (3시간)
            </p>
          </li>
          <li className={workInfoLayout()}>
            <Icon
              iconName='map'
              iconSize='sm'
              ariaLabel='근무위치'
              className={workInfoIcon({ status: statusVariant })}
            />
            <p className={workInfoText({ status: statusVariant })}>서울시 송파구</p>
          </li>
        </ul>
        <div className={workPayLayout()}>
          <span className={postHeading({ status: statusVariant, className: 'w-full' })}>
            15,000원
          </span>
          <div className={postBadge({ status: statusVariant })}>
            <span className={badgeText({ status: statusVariant })}>기존 시급보다 100%</span>
            <Icon
              iconName='arrowUp'
              iconSize='sm'
              bigScreenSize='rg'
              ariaLabel='시급정보'
              className={badgeIcon({ status: statusVariant })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
