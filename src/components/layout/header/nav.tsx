import { Icon } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

const Nav = () => {
  return (
    <nav className={cn('flex shrink-0 gap-4 text-body-m font-bold', 'desktop:gap-10')}>
      <Link href={`/`}>로그인</Link>
      <Link href={`/`}>회원가입</Link>
      <button>
        <Icon iconName='notificationOff' iconSize='rg' bigScreenSize='md' ariaLabel='알림' />
      </button>
    </nav>
  );
};
export default Nav;
