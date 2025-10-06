import { Icon } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils/cn';
import { UserRole } from '@/types/user';
import Link from 'next/link';
import { ReactNode } from 'react';

const NAV_CONFIG: Record<UserRole, ReactNode> = {
  guest: (
    <>
      <Link href='/login'>로그인</Link>
      <Link href='/signup'>회원가입</Link>
    </>
  ),
  employee: (
    <>
      <Link href='/my-profile'>내 프로필</Link>
    </>
  ),
  employer: (
    <>
      <Link href='/my-shop'>내 가게</Link>
    </>
  ),
};

const Nav = () => {
  const { role, isLogin, logout } = useAuth();
  const navRole: UserRole = !isLogin ? 'guest' : role === 'employer' ? 'employer' : 'employee';

  return (
    <nav className={cn('flex shrink-0 items-center gap-4 text-body-m font-bold', 'desktop:gap-10')}>
      {NAV_CONFIG[navRole]}
      {isLogin && (
        <>
          <button onClick={logout}>로그아웃</button>
          <button>
            <Icon iconName='notificationOff' iconSize='rg' bigScreenSize='md' ariaLabel='알림' />
          </button>
        </>
      )}
    </nav>
  );
};
export default Nav;
