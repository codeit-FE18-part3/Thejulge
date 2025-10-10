import { Button } from '@/components/ui/button';
import Notice from '@/components/ui/card/notice/notice';
import { getNoticeStatus } from '@/lib/utils/getNoticeStatus';
import type { NoticeCard } from '@/types/notice';
import { NoticeShopCard } from '@/types/shop';
import Link from 'next/link';
import mockResponse from './mockData.json';
import shopMockResponse from './shopMockData.json';

// mockData
type RawNotice = typeof mockResponse;
type RawShopNotice = typeof shopMockResponse;

const toNoticeCard = ({ item }: RawNotice): NoticeCard => {
  const shop = item.shop.item;

  return {
    id: item.id,
    hourlyPay: item.hourlyPay,
    startsAt: item.startsAt,
    workhour: item.workhour,
    description: item.description,
    closed: item.closed,
    shopId: shop.id,
    name: shop.name,
    category: shop.category,
    address1: shop.address1,
    shopDescription: shop.description,
    imageUrl: shop.imageUrl,
    originalHourlyPay: shop.originalHourlyPay,
  };
};
const toShopCard = ({ item }: RawShopNotice): NoticeShopCard => {
  const shop = item;

  return {
    shopId: shop.id,
    name: shop.name,
    category: shop.category,
    address1: shop.address1,
    shopDescription: shop.description,
    imageUrl: shop.imageUrl,
  };
};

const NoticeWrapper = () => {
  //  notice
  const notice: NoticeCard = toNoticeCard(mockResponse);
  const status = getNoticeStatus(notice.closed, notice.startsAt);
  const href = `/shops/${notice.shopId}/notices/${notice.id}`;
  //  shop
  const shopItem: NoticeShopCard = toShopCard(shopMockResponse);
  return (
    <>
      <Notice notice={notice}>
        <Button
          as={Link}
          href={href}
          size='xs38'
          full
          className='font-bold'
          variant={status !== 'open' ? 'disabled' : 'primary'}
        >
          {status !== 'open' ? '신청 불가' : '신청하기'}
        </Button>
      </Notice>
      <Notice notice={shopItem} variant='shop'>
        <Button as={Link} href={href} size='xs38' full className='font-bold'>
          가게 편집하기
        </Button>
      </Notice>
    </>
  );
};

export default NoticeWrapper;
