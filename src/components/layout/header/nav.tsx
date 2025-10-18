import { Icon } from '@/components/ui';
import Notification, { type Alert } from '@/components/ui/modal/notification/Notification';
import { useUserApplications } from '@/context/userApplicationsProvider';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils/cn';
import { UserRole } from '@/types/user';
import Link from 'next/link';
import { useMemo, useState } from 'react';

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
  const { applications } = useUserApplications();
  const [open, setOpen] = useState(false);
  // 읽음 처리한 알림 ID들 (간단 로컬 상태)
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  // 알바님 알림: 승인/거절만 표시
  const alerts: Alert[] = useMemo(() => {
    return applications
      .filter(a => a.item.status !== 'pending')
      .map(a => ({
        id: a.item.id,
        createdAt: a.item.createdAt ?? new Date().toISOString(),
        result: a.item.status === 'accepted' ? 'accepted' : 'rejected',
        // ▶ 읽음: 사용자가 메시지를 클릭했을 때만 true
        read: readIds.has(a.item.id),
        shop: { item: a.item.shop.item, href: `/shops/${a.item.shop.item.id}` },
        notice: { item: a.item.notice.item, href: `/notices/${a.item.notice.item.id}` },
      }));
  }, [applications, readIds]);

  const unreadCount = alerts.filter(a => !a.read).length;
  const bellIcon: 'notificationOn' | 'notificationOff' =
    unreadCount > 0 ? 'notificationOn' : 'notificationOff';

  const handleRead = (id: string) => {
    setReadIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

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
          <button type='button' aria-label='알림 확인하기' onClick={() => setOpen(true)}>
            <Icon iconName={bellIcon} iconSize='rg' bigScreenSize='md' ariaLabel='알림' />
          </button>
          <div className='absolute right-4 top-[64px] z-[50] w-full max-w-[420px]'>
            <Notification
              alerts={alerts}
              onRead={handleRead}
              isOpen={open}
              onClose={() => setOpen(false)}
            />
          </div>
        </>
      )}
    </nav>
  );
};
export default Nav;
