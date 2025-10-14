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

const cardInfoLayout = cva('flex flex-nowrap items-center tablet:items-center gap-1.5');

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
      open: 'bg-gray-700',
      inactive: 'bg-gray-300',
    },
  },
  defaultVariants: { status: 'open' },
});

const cardPayLayout = cva('flex items-center gap-x-3');

const cardPayText = cva('font-bold text-modal tracking-wide', {
  variants: {
    status: {
      open: 'text-black',
      inactive: 'text-gray-300',
    },
  },
  defaultVariants: { status: 'open' },
});
const cardBadge = cva(
  'flex items-center gap-x-0.5 rounded-full px-2 py-1 tablet:py-2 tablet:px-3',
  {
    variants: {
      status: {
        post: 'absolute bottom-3 right-3 z-[1] border border-white',
        notice: '',
      },
    },
    defaultVariants: { status: 'notice' },
  }
);

const cardBadgeText = cva('whitespace-nowrap text-caption text-white font-bold tablet:text-body-s');

const cardBadgeIcon = cva('self-start bg-white');

export const cardLayout = {
  frame: cardFrame,
  imageWrapper: cardImageWrapper,
  heading: cardHeading,
  infoLayout: cardInfoLayout,
  info: cardInfoText,
  infoIcon: cardInfoIcon,
  payLayout: cardPayLayout,
  payText: cardPayText,
  badge: cardBadge,
  badgeText: cardBadgeText,
  badgeIcon: cardBadgeIcon,
};
export type CardStatusVariant = VariantProps<typeof cardHeading>['status'];
