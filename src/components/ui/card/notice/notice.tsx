import { Container } from '@/components/layout';
import { NoticeCard } from '@/types/notice';
import { ReactNode } from 'react';
import RenderNotice from './components/renderNotice';
import RenderShop from './components/renderShop';
import { noticeWrapper } from './notice.styles';

export type NoticeVariant = 'notice' | 'shop';
interface NoticeProps<T extends Partial<NoticeCard>> {
  notice: T;
  variant?: NoticeVariant;
  children: ReactNode;
}

const Notice = <T extends Partial<NoticeCard>>({
  notice,
  variant = 'notice',
  children,
}: NoticeProps<T>) => {
  const {
    hourlyPay,
    startsAt,
    workhour,
    description,
    name,
    category,
    address1,
    shopDescription,
    imageUrl,
    originalHourlyPay,
  } = notice;

  const noticeValue = {
    hourlyPay: hourlyPay ?? 0,
    originalHourlyPay: originalHourlyPay ?? 0,
    startsAt: startsAt ?? '',
    workhour: workhour ?? 0,
    address1: address1 ?? '',
    shopDescription: shopDescription ?? '',
  };

  const noticeItem = {
    name,
    category,
    imageUrl,
    description,
    variant: 'notice' as const,
    value: noticeValue,
  };

  const shopValue = {
    name: name ?? '',
    category: category ?? '',
    address1: address1 ?? '',
    imageUrl: imageUrl ?? '',
    shopDescription: shopDescription ?? '',
  };

  const shopItem = {
    name,
    imageUrl,
    variant: 'shop' as const,
    value: shopValue,
  };

  return (
    <Container className={noticeWrapper()}>
      {variant === 'notice' ? (
        <RenderNotice items={noticeItem} buttonComponent={children} />
      ) : (
        <RenderShop items={shopItem} buttonComponent={children} />
      )}
    </Container>
  );
};
export default Notice;
