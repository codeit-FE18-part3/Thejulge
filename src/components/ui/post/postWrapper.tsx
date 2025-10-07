import type { PostCard } from '@/types/notice';
import mockResponse from './mockData.json';
import Post from './post';

// mockData 용 페이지

type RawNotice = (typeof mockResponse)['items'][number];

const toPostCard = ({ item, links }: RawNotice): PostCard => {
  const shop = item.shop.item;
  const href = links.find(link => link.rel === 'self')?.href ?? item.shop.href;

  return {
    id: item.id,
    hourlyPay: item.hourlyPay,
    startsAt: item.startsAt,
    workhour: item.workhour,
    description: item.description,
    closed: item.closed,
    name: shop.name,
    address1: shop.address1,
    imageUrl: shop.imageUrl,
    originalHourlyPay: shop.originalHourlyPay,
    href,
  };
};

const PostWrapper = () => {
  const notices: PostCard[] = mockResponse.items.map(toPostCard);

  return (
    <div className='grid gap-6 grid-cols-2 desktop:grid-cols-3'>
      {notices.map(notice => (
        <Post key={notice.id} notice={notice} />
      ))}
    </div>
  );
};

export default PostWrapper;
