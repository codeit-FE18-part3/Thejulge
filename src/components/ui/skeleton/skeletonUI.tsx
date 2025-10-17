import { cn } from '@/lib/utils/cn';

const SkeletonUI = ({ count = 0, className = '' }) => {
  return (
    <div className={cn('grid gap-x-4 gap-y-8 sm:grid-cols-2 desktop:grid-cols-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex-0 aspect-square w-full rounded-2xl',
            'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200',
            'bg-[length:400%_100%]',
            'animate-skeleton-shimmer',
            className
          )}
        ></div>
      ))}
    </div>
  );
};
export default SkeletonUI;
