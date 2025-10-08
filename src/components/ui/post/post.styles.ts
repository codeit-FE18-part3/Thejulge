// src/components/post.styles.ts
import { cva, type VariantProps } from 'class-variance-authority';

export const postWrapper = cva(
  'block rounded-xl border border-gray-200 p-3 tablet:rounded-2xl tablet:p-4'
);

export const postImageWrapper = cva(
  'relative rounded-xl overflow-hidden h-[120px] tablet:h-[160px]'
);

export const postImageDimmed = cva(
  'absolute inset-0 flex items-center justify-center bg-modal-dimmed text-heading-s text-zinc-300 font-bold'
);

export const postHeading = cva('text-heading-s font-bold', {
  variants: {
    status: {
      open: '',
      inactive: 'text-gray-300',
    },
  },
  defaultVariants: { status: 'open' },
});

export const workInfoLayout = cva('flex flex-nowrap items-start tablet:items-center gap-1.5');

export const workInfoText = cva('text-caption tablet:text-body-s', {
  variants: {
    status: {
      open: 'text-gray-500',
      inactive: 'text-gray-300',
    },
  },
  defaultVariants: { status: 'open' },
});

export const workInfoIcon = cva('', {
  variants: {
    status: {
      open: 'bg-red-300',
      inactive: 'bg-gray-300',
    },
  },
  defaultVariants: { status: 'open' },
});

export const workPayLayout = cva(
  'mt-4 flex flex-wrap items-center justify-between gap-x-3 tablet:flex-nowrap'
);

export const postBadge = cva('flex items-center gap-x-0.5 rounded-full tablet:py-2 tablet:px-3', {
  variants: {
    status: {
      open: 'tablet:bg-red-400',
      inactive: 'tablet:bg-gray-200',
    },
  },
  defaultVariants: { status: 'open' },
});

export const badgeText = cva(
  'whitespace-nowrap text-caption tablet:text-body-s tablet:font-bold tablet:text-white',
  {
    variants: {
      status: {
        open: 'text-red-400',
        inactive: 'text-gray-300',
      },
    },
    defaultVariants: { status: 'open' },
  }
);
export const badgeIcon = cva('tablet:bg-white', {
  variants: {
    status: {
      open: 'bg-red-400',
      inactive: 'bg-gray-300',
    },
  },
  defaultVariants: { status: 'open' },
});
export type PostStatusVariant = VariantProps<typeof postHeading>['status'];
