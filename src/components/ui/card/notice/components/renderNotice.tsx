import { descriptionWrapper, noticeFrame } from '@/components/ui/card/notice/notice.styles';
import { type NoticeCard } from '@/types/notice';
import { ReactNode } from 'react';
import NoticeHeader from './noticeHeader';
import NoticeImage from './noticeImage';
import NoticeInfo from './noticeInfo';

interface RenderNoticeProps<T extends Partial<NoticeCard>> {
  items: {
    name?: string;
    category?: string;
    imageUrl?: string;
    description?: string;
    variant: 'notice';
    value: T;
  };
  buttonComponent: ReactNode;
}

const RenderNotice = <T extends Partial<NoticeCard>>({
  items,
  buttonComponent,
}: RenderNoticeProps<T>) => {
  const { name, imageUrl, category, description, variant, value } = items;
  return (
    <>
      <NoticeHeader name={name} category={category} />
      <section className={noticeFrame()}>
        <NoticeImage name={name} imageUrl={imageUrl} />
        <NoticeInfo variant={variant} value={value} buttonComponent={buttonComponent} />
      </section>
      <section className={descriptionWrapper()}>
        <h3 className='text-body-l font-bold'>공고 설명</h3>
        <p className='text-body-l'>{description}</p>
      </section>
    </>
  );
};
export default RenderNotice;
