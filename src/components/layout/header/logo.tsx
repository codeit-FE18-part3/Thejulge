import logo from '@/assets/images/logo.svg';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className={cn('relative h-[30px] w-[84px] shrink-0', 'tablet:h-[40px] tablet:w-[112px]')}>
      <Image
        src={logo}
        alt='더 줄게'
        className='object-contain'
        fill
        priority
        sizes='(max-width: 744px) 84px, 112px'
      />
    </div>
  );
};
export default Logo;
