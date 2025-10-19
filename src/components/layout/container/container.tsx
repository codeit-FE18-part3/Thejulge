import { cn } from '@/lib/utils/cn';
import { ElementType, ReactNode } from 'react';

interface Props {
  as?: ElementType;
  className?: string;
  isPage?: boolean;
  children: ReactNode;
}

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return <div className='flex min-h-screen flex-col'>{children}</div>;
};

const Container = ({ as: Component = 'div', isPage = false, className, children }: Props) => {
  return (
    <Component
      className={cn(
        'mx-auto w-full max-w-[1028px] px-3',
        'tablet:px-8',
        isPage && 'py-10 tablet:py-16',
        className
      )}
    >
      {children}
    </Component>
  );
};
export default Container;
