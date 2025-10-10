import { Container } from '@/components/layout';
import { cardLayout } from '@/components/ui/card/card.styles';
import { cn } from '@/lib/utils/cn';
import { NoticeCard } from '@/types/notice';
import { ReactNode } from 'react';
import { noticeFrame, noticeWrapper } from './notice.styles';
import NoticeHeader from './noticeHeader';
import NoticeImage from './noticeImage';
import NoticeInfo from './noticeInfo';

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
  const noticeVariantValue = {
    hourlyPay,
    originalHourlyPay,
    startsAt,
    workhour,
    address1,
    shopDescription,
  };
  const shopVariantValue = {
    name,
    category,
    address1,
    shopDescription,
  };
  return (
    <Container className={noticeWrapper()}>
      {variant === 'notice' && (
        <>
          <NoticeHeader name={name} category={category} />
          <section className={noticeFrame()}>
            <NoticeImage name={name} imageUrl={imageUrl} />
            <NoticeInfo variant={variant} value={noticeVariantValue} buttonComponent={children} />
          </section>
          <section className='flex flex-col gap-3 rounded-xl bg-gray-100 p-8'>
            <h3 className='text-body-l font-bold'>공고 설명</h3>
            <p className='text-body-l'>{description}</p>
          </section>
        </>
      )}
      {variant === 'shop' && (
        <>
          <h2 className={cardLayout.heading({ size: 'lg' })}>내 가게</h2>
          <section className={cn(noticeFrame(), 'bg-red-100')}>
            <NoticeImage name={name} imageUrl={imageUrl} />
            <NoticeInfo variant={variant} value={shopVariantValue} buttonComponent={children} />
          </section>
        </>
      )}
    </Container>
  );
};
export default Notice;
