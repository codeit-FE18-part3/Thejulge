import { Icon } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils/cn';
import { UserRole } from '@/types/user';
import Link from 'next/link';

interface NavItems {
  href: string;
  label: string;
}

const NAV_ITEMS: Record<UserRole, NavItems[]> = {
  guest: [
    { href: '/login', label: '로그인' },
    { href: '/signup', label: '회원가입' },
  ],
  employee: [{ href: '/my-profile', label: '내 프로필' }],
  employer: [{ href: '/my-shop', label: '내 가게' }],
};

const Nav = () => {
  const { role, isLogin, logout } = useAuth();

  return (
    <nav className={cn('flex shrink-0 items-center gap-4 text-body-m font-bold', 'desktop:gap-10')}>
      {NAV_ITEMS[role].map(({ href, label }) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}

      {isLogin && (
        <>
          <button
            type='button'
            onClick={e => {
              e.preventDefault();
              logout('/');
            }}
          >
            로그아웃
          </button>
          <button type='button' aria-label='알림 확인하기'>
            <Icon iconName='notificationOff' iconSize='rg' bigScreenSize='md' ariaLabel='알림' />
          </button>
        </>
      )}
    </nav>
  );
};
export default Nav;
