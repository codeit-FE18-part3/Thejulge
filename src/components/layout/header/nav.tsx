import { getUserAlerts, markAlertRead } from '@/api/alerts';
import { Icon } from '@/components/ui';
import Notification, { type Alert } from '@/components/ui/modal/notification/Notification';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils/cn';
import { UserRole } from '@/types/user';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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
  const { role, isLogin, logout, user } = useAuth();

  const [open, setOpen] = useState(false);
  const bellBtnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);

  // 패널 열릴 때 서버 알림 로드
  useEffect(() => {
    if (!isLogin || !user?.id) return;
    if (!open) return;
    (async () => {
      try {
        setLoading(true);
        const res = await getUserAlerts(user.id, { limit: 50, offset: 0 });
        const mapped: Alert[] = res.items.map(a => ({
          id: a.item.id,
          createdAt: a.item.createdAt,
          result: a.item.result,
          read: a.item.read,
          shop: { item: a.item.shop.item, href: `/shops/${a.item.shop.item.id}` },
          notice: { item: a.item.notice.item, href: `/notices/${a.item.notice.item.id}` },
        }));
        setAlerts(mapped);
      } finally {
        setLoading(false);
      }
    })();
  }, [isLogin, user?.id, open]);

  const unreadCount = alerts.filter(a => !a.read).length;
  const bellIcon: 'notificationOn' | 'notificationOff' =
    unreadCount > 0 ? 'notificationOn' : 'notificationOff';

  const handleRead = async (id: string) => {
    if (!user?.id) return;
    try {
      await markAlertRead(user.id, id);
      setAlerts(prev => prev.map(a => (a.id === id ? { ...a, read: true } : a)));
    } catch {
      // 실패 시 조용히 무시
    }
  };

  // 바깥 클릭/ESC 닫힘
  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const insidePanel = panelRef.current?.contains(target);
      const onBell = bellBtnRef.current?.contains(target);
      if (!insidePanel && !onBell) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

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
              setOpen(false);
              logout('/');
            }}
          >
            로그아웃
          </button>

          <button
            ref={bellBtnRef}
            type='button'
            aria-label='알림 확인하기'
            onClick={() => setOpen(v => !v)}
          >
            <Icon iconName={bellIcon} iconSize='rg' bigScreenSize='md' ariaLabel='알림' />
          </button>

          {/* 알림 패널 */}
          <div ref={panelRef} className='absolute right-4 top-[64px] z-[50] w-full max-w-[420px]'>
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
