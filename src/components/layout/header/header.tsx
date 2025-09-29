import logo from '@/assets/images/logo.svg';
import { Icon } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header
      className={cn(
        'flex flex-wrap items-center justify-between gap-x-8 gap-y-4',
        'max-w-[1094px] px-5 py-[10px]',
        'tablet:flex-nowrap tablet:px-8 tablet:py-[15px]'
      )}
    >
      <div
        className={cn('relative h-[30px] w-[84px] shrink-0', 'tablet:h-[40px] tablet:w-[112px]')}
      >
        <Image src={logo} alt='더 줄게' className='object-contain' fill priority />
      </div>
      <div className={cn('relative order-1 w-full grow', 'tablet:order-none')}>
        <Icon
          iconName='search'
          iconSize='rg'
          className='absolute ml-3 mt-3 bg-gray-400'
          ariaLabel='검색'
        />
        <input
          type='text'
          id='shopSearchKeyWord'
          name='shopSearchKeyWord'
          className={cn(
            'w-full rounded-xl bg-gray-100 p-3 pl-10 text-body-s',
            'focus:outline-red-300'
          )}
          placeholder='가게 이름으로 찾아보세요 '
        />
      </div>
      <nav className={cn('flex shrink-0 gap-4 text-body-m font-bold', 'desktop:gap-10')}>
        <Link href={`/`}>로그인</Link>
        <Link href={`/`}>회원가입</Link>
        <button>
          <Icon iconName='notificationOff' iconSize='rg' bigScreenSize='md' ariaLabel='알림' />
        </button>
      </nav>
    </header>
  );
};
export default Header;
