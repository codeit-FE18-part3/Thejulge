import { cn } from '@/lib/utils/cn';
import { ElementType, ReactNode } from 'react';

interface Props {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return <div className='flex min-h-screen flex-col flex-nowrap'>{children}</div>;
};

const Container = ({ as: Component = 'main', className, children }: Props) => {
  const isMain = Component === 'main';

  return (
    <Component
      className={cn(
        'relative z-[1]',
        'mx-auto w-full max-w-[1028px] px-3',
        'tablet:px-8',
        isMain && 'grow',
        className
      )}
    >
      {children}
    </Component>
  );
};
export default Container;
