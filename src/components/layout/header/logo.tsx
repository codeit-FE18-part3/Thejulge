import logo from '@/assets/images/logo.svg';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <h1 className={cn('h-[30px] w-[84px] shrink-0', 'tablet:h-[40px] tablet:w-[112px]')}>
      <Link href='/' aria-label='홈으로 이동' className={cn('relative block h-full')}>
        <Image
          src={logo}
          alt='더 줄게 로고'
          className='object-contain'
          fill
          sizes='(max-width: 744px) 84px, 112px'
        />
      </Link>
    </h1>
  );
};
export default Logo;
