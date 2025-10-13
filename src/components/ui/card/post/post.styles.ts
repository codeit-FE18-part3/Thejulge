import { cardLayout } from '@/components/ui/card/card.styles';
import { cn } from '@/lib/utils/cn';
import { cva } from 'class-variance-authority';

export const postFrame = cva(cn(cardLayout.frame(), 'block p-3 tablet:rounded-2xl tablet:p-4'));

export const postImageWrapper = cva(cn(cardLayout.imageWrapper(), 'h-[120px] tablet:h-[160px]'));

export const postImageDimmed = cva(
  'absolute inset-0 z-[2] flex items-center justify-center bg-modal-dimmed text-heading-s text-zinc-300 font-bold'
);


