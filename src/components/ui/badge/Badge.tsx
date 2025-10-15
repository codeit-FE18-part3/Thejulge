import { cn } from '@/lib/utils/cn';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1.5 text-sm font-medium',
        className
      )}
    >
      {children}
    </span>
  );
}
