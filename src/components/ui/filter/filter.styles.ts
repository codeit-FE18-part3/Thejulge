import { cn } from '@/lib/utils/cn';
import { cva } from 'class-variance-authority';

const filterPosition = cva('bg-background w-full');

const filterStickyContent = cva('sticky left-0 flex border-gray-200');

const filterWrapper = cva(
  cn(
    filterPosition(),
    'fixed top-0 z-10 h-dvh overflow-hidden rounded-xl border border-gray-200 min-[480px]:absolute min-[480px]:h-fit min-[480px]:w-[390px] min-[480px]:top-[calc(100%+8px)]'
  )
);

const filterPlacement = cva('', {
  variants: {
    align: {
      left: 'left-0',
      right: 'right-0',
    },
  },
  defaultVariants: {
    align: 'right',
  },
});

const filterPadding = cva('px-3 tablet:px-5');

const filterGap = cva('flex flex-col gap-6');

const filterHeader = cva(
  cn(
    filterPosition(),
    filterStickyContent(),
    filterPadding(),
    'top-0 items-center justify-between border-b pb-3 pt-6'
  )
);

const filterBody = cva(
  cn(
    filterGap(),
    filterPadding(),
    'scroll-bar py-3 h-[calc(100dvh-94px-61px)] min-[480px]:h-fit min-[480px]:max-h-[calc(600px)]'
  )
);

const filterFooter = cva(
  cn(filterPosition(), filterStickyContent(), filterPadding(), 'bottom-0 gap-2 border-t pb-6 pt-3')
);

const filterLocationWrapper = cva(
  'scroll-bar flex h-64 flex-wrap gap-3 rounded-md border border-gray-200 bg-white p-5'
);

const filterLocationText = cva(
  'shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-center text-body-m'
);

const filterLocation = cva(cn(filterLocationText(), 'hover:bg-red-100 hover:text-red-500'));

const filterLocationSelected = cva(
  cn(filterLocationText(), 'flex items-center gap-2 bg-red-100 font-bold text-red-500')
);

export const filterLayout = {
  position: filterPosition,
  stickyContent: filterStickyContent,
  wrapper: filterWrapper,
  placement: filterPlacement,
  padding: filterPadding,
  header: filterHeader,
  body: filterBody,
  footer: filterFooter,
  filterGap,
  locationWrapper: filterLocationWrapper,
  locationText: filterLocationText,
  location: filterLocation,
  locationSelected: filterLocationSelected,
};
