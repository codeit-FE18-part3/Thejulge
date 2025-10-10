import { cardLayout } from '@/components/ui/card/card.styles';
import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

export const postFrame = cva(cn(cardLayout.frame(), 'block p-3 tablet:rounded-2xl tablet:p-4'));

export const postImageWrapper = cva(cn(cardLayout.imageWrapper(), 'h-[120px] tablet:h-[160px]'));

export const postImageDimmed = cva(
  'absolute inset-0 flex items-center justify-center bg-modal-dimmed text-heading-s text-zinc-300 font-bold'
);

export const payLayout = cva(
  cn(cardLayout.payLayout(), 'mt-4 flex-wrap justify-between tablet:flex-nowrap')
);

export const payBadge = cva(cn(cardLayout.badge(), 'tablet:py-2 tablet:px-3'), {
  variants: {
    status: {
      open: 'tablet:bg-red-400',
      inactive: 'tablet:bg-gray-200',
    },
  },
  defaultVariants: { status: 'open' },
});

export const badgeText = cva(cn(cardLayout.badgeText(), 'tablet:font-bold tablet:text-white'), {
  variants: {
    status: {
      open: 'text-red-400',
      inactive: 'text-gray-300',
    },
  },
  defaultVariants: { status: 'open' },
});
export const badgeIcon = cva('self-start tablet:bg-white', {
  variants: {
    status: {
      open: 'bg-red-400',
      inactive: 'bg-gray-300',
    },
  },
  defaultVariants: { status: 'open' },
});
export type PostStatusVariant = VariantProps<typeof badgeIcon>['status'];
