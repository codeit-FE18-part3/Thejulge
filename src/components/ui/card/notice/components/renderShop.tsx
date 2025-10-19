import { cardLayout } from '@/components/ui/card/card.styles';
import CardImage from '@/components/ui/card/cardImage';
import { noticeFrame } from '@/components/ui/card/notice/notice.styles';
import { cn } from '@/lib/utils/cn';
import { NoticeShopCard } from '@/types/shop';
import { ReactNode } from 'react';
import NoticeInfo from './noticeInfo';

type ShopCard = Omit<NoticeShopCard, 'shopId'>;

interface RenderShopItems {
  name?: string;
  imageUrl?: string;
  variant: 'shop';
  value: ShopCard;
}

interface RenderShopProps {
  items: RenderShopItems;
  buttonComponent: ReactNode;
}

const RenderShop = ({ items, buttonComponent }: RenderShopProps) => {
  const { name, imageUrl, variant, value } = items;
  return (
    <>
      <h2 className={cardLayout.heading({ size: 'lg' })}>내 가게</h2>
      <section className={cn(noticeFrame(), 'bg-red-100')}>
        <CardImage variant='notice' src={imageUrl} alt={name} />
        <NoticeInfo variant={variant} value={value} buttonComponent={buttonComponent} />
      </section>
    </>
  );
};
export default RenderShop;
