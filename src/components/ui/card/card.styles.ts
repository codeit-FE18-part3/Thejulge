import { cva, type VariantProps } from 'class-variance-authority';

const cardFrame = cva('rounded-xl border border-gray-200 bg-white');

const cardImageWrapper = cva('relative rounded-xl overflow-hidden');

const cardHeading = cva('font-bold', {
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

const cardInfoLayout = cva('flex flex-nowrap items-start tablet:items-center gap-1.5');

const cardInfoText = cva('text-caption tablet:text-body-s', {
  variants: {
    status: {
      open: 'text-gray-500',
      inactive: 'text-gray-300',
    },
  },
  defaultVariants: { status: 'open' },
});

const cardInfoIcon = cva('', {
  variants: {
    status: {
      open: 'bg-red-300',
      inactive: 'bg-gray-300',
    },
  },
  defaultVariants: { status: 'open' },
});

const cardPayLayout = cva('flex items-center gap-x-3');

const cardBadge = cva('flex items-center gap-x-0.5 rounded-full');

const cardBadgeText = cva('whitespace-nowrap text-caption tablet:text-body-s');

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
