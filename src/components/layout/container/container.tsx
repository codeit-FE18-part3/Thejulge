import { cn } from '@/lib/utils/cn';
import { ElementType, ReactNode } from 'react';

interface Props {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return <div className='flex min-h-screen flex-col'>{children}</div>;
};

const Container = ({ as: Component = 'div', className, children }: Props) => {
  return (
    <Component
      className={cn(
        'relative z-[1]',
        'mx-auto w-full max-w-[1028px] px-3',
        'tablet:px-8',
        className
      )}
    >
      {children}
    </Component>
  );
};
export default Container;
