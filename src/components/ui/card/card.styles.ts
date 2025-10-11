import { cva, type VariantProps } from 'class-variance-authority';

export const cardFrame = cva('rounded-xl border border-gray-200 bg-white');

export const cardImageWrapper = cva('relative rounded-xl overflow-hidden');

export const cardHeading = cva('font-bold', {
  variants: {
    size: {
      sm: 'text-heading-s',
      md: 'text-heading-m',
      lg: 'text-heading-l',
    },
    status: {
      open: 'text-black',
      inactive: 'text-gray-300',
    },
  },
  defaultVariants: { size: 'md', status: 'open' },
});

export const cardInfoLayout = cva('flex flex-nowrap items-start tablet:items-center gap-1.5');

export const cardInfoText = cva('text-caption tablet:text-body-s', {
  variants: {
    status: {
      open: 'text-gray-500',
      inactive: 'text-gray-300',
    },
  },
  defaultVariants: { status: 'open' },
});

export const cardInfoIcon = cva('', {
  variants: {
    status: {
      open: 'bg-red-300',
      inactive: 'bg-gray-300',
    },
  },
  defaultVariants: { status: 'open' },
});

export const cardPayLayout = cva('flex items-center gap-x-3');

export const cardBadge = cva('flex items-center gap-x-0.5 rounded-full');

export const cardBadgeText = cva('whitespace-nowrap text-caption tablet:text-body-s');

export const cardLayout = {
  frame: cardFrame,
  imageWrapper: cardImageWrapper,
  heading: cardHeading,
  infoLayout: cardInfoLayout,
  info: cardInfoText,
  infoIcon: cardInfoIcon,
  payLayout: cardPayLayout,
  badge: cardBadge,
  badgeText: cardBadgeText,
};
export type CardStatusVariant = VariantProps<typeof cardHeading>['status'];
