import { type NoticeCard, NoticeItemResponse, PostCard } from '@/types/notice';

export const toPostCard = (res: NoticeItemResponse): PostCard => {
  const n = res.item;
  const shop = n.shop.item;

  return {
    id: n.id,
    hourlyPay: n.hourlyPay,
    startsAt: n.startsAt,
    workhour: n.workhour,
    closed: n.closed,
    shopId: shop.id,
    name: shop.name,
    address1: shop.address1,
    imageUrl: shop.imageUrl,
    originalHourlyPay: shop.originalHourlyPay,
  };
};

export const toNoticeCard = (res: NoticeItemResponse): NoticeCard => {
  const n = res.item;
  const shop = n.shop.item;

  return {
    id: n.id,
    hourlyPay: n.hourlyPay,
    startsAt: n.startsAt,
    workhour: n.workhour,
    description: n.description,
    closed: n.closed,
    shopId: shop.id,
    name: shop.name,
    category: shop.category,
    address1: shop.address1,
    shopDescription: shop.description,
    imageUrl: shop.imageUrl,
    originalHourlyPay: shop.originalHourlyPay,
  };
};
