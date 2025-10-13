import { cardLayout } from '@/components/ui/card/card.styles';
import { cn } from '@/lib/utils/cn';
import { cva } from 'class-variance-authority';

export const noticeWrapper = cva('flex flex-col gap-4 tablet:gap-6');

export const noticeFrame = cva(
  cn(
    cardLayout.frame(),
    'flex flex-col gap-3 p-5 tablet:gap-4 tablet:p-6 desktop:flex-row desktop:gap-8'
  )
);

export const noticeImageWrapper = cva(
  cn(cardLayout.imageWrapper(), 'w-full h-[180px] tablet:h-[360px] desktop:h-auto')
);

export const noticeInfoWrapper = cva('shrink-0 desktop:w-[346px]');

export const noticeLabel = cva('pb-2 text-body-m font-bold text-red-400');

export const descriptionWrapper = cva('flex flex-col gap-3 rounded-xl bg-gray-100 p-4 tablet:p-8');

export const noticeButton = cva('mt-6 tablet:mt-10 desktop:mt-8');
