import { cn } from '@/lib/utils/cn';
import { type CardVariant } from '@/types/notice';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import { cardLayout } from './card.styles';

interface CardImageProps {
  variant: CardVariant;
  src?: string;
  alt?: string;
  className?: string;
  children?: ReactNode;
}
const FALLBACK_SRC = '/fallback.png';
const CardImage = ({ variant, src, alt, className, children }: CardImageProps) => {
  const [imgSrc, setImgSrc] = useState(src ?? FALLBACK_SRC);

  // src가 비동기로 들어오거나 변경될 때 state를 동기화
  useEffect(() => {
    setImgSrc(src ?? FALLBACK_SRC);
  }, [src]);

  const handleError = () => {
    setImgSrc(FALLBACK_SRC);
  };

  const isValidSrc =
    typeof imgSrc === 'string' &&
    (imgSrc.startsWith('https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com') ||
      imgSrc.startsWith('https://picsum.photos'));

  return (
    <div
      className={cn(
        cardLayout.imageWrapper(),
        variant === 'notice'
          ? 'h-[180px] w-full tablet:h-[360px] desktop:h-auto'
          : 'h-[120px] tablet:h-[160px]',
        className
      )}
    >
      <Image
        src={isValidSrc ? imgSrc : FALLBACK_SRC}
        alt={`${alt} 가게 이미지`}
        fill
        sizes={
          variant === 'notice'
            ? '(max-width: 744px) 630px, 540px'
            : '(max-width: 744px) 120px, 160px'
        }
        className='object-cover'
        onError={handleError}
        priority
      />
      {children}
    </div>
  );
};
export default CardImage;
