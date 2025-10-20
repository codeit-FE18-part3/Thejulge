import { getUserAlerts, markAlertRead } from '@/api/alerts';
import { Icon } from '@/components/ui';
import Notification, { type Alert } from '@/components/ui/modal/notification/Notification';
import { useUserApplications } from '@/context/userApplicationsProvider';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils/cn';
import { UserRole } from '@/types/user';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

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
  const { applications } = useUserApplications();

  const [open, setOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [apiAlerts, setApiAlerts] = useState<Alert[]>([]);

  // 1) 서버 알림 불러오기 (사장님/알바 공통)
  useEffect(() => {
    if (!isLogin || !user?.id) {
      setApiAlerts([]);
      return;
    }
    (async () => {
      try {
        const res = await getUserAlerts(user.id, { offset: 0, limit: 50 });
        const mapped: Alert[] = (res.items ?? []).map(({ item }) => ({
          id: item.id,
          createdAt: item.createdAt,
          result: item.result,
          read: item.read,
          shop: { item: item.shop.item },
          notice: { item: item.notice.item },
        }));
        setApiAlerts(mapped);
      } catch {
        setApiAlerts([]); // 실패해도 UI는 동작(직원 fallback)
      }
    })();
  }, [isLogin, user?.id]);

  // 2) (직원 전용) 지원내역 기반 fallback 알림
  const fallbackAlertsForEmployee: Alert[] = useMemo(() => {
    if (role !== 'employee') return [];
    return applications
      .filter(a => a.item.status !== 'pending')
      .map(a => ({
        id: a.item.id,
        createdAt: a.item.createdAt ?? new Date().toISOString(),
        result: a.item.status === 'accepted' ? 'accepted' : 'rejected',
        read: readIds.has(a.item.id),
        shop: { item: a.item.shop.item, href: `/shops/${a.item.shop.item.id}` },
        notice: { item: a.item.notice.item, href: `/notices/${a.item.notice.item.id}` },
      }));
  }, [applications, role, readIds]);

  // 3) 실제 표시할 알림: 서버 결과가 있으면 우선, 없으면(특히 직원) fallback
  const alerts: Alert[] = useMemo(() => {
    const base = apiAlerts.length > 0 ? apiAlerts : fallbackAlertsForEmployee;
    // 로컬 읽음 세트 반영(서버 알림에도 적용)
    return base.map(a => (readIds.has(a.id) ? { ...a, read: true } : a));
  }, [apiAlerts, fallbackAlertsForEmployee, readIds]);

  const unreadCount = alerts.filter(a => !a.read).length;
  const bellIcon: 'notificationOn' | 'notificationOff' =
    open || unreadCount > 0 ? 'notificationOn' : 'notificationOff';
  const bellColor = open || unreadCount > 0 ? 'bg-red-400' : 'bg-black';

  // 알림 읽음 처리(서버 + 로컬 동기화)
  const handleRead = async (id: string) => {
    try {
      if (user?.id) await markAlertRead(user.id, id);
    } finally {
      setReadIds(prev => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      setApiAlerts(prev => prev.map(a => (a.id === id ? { ...a, read: true } : a)));
    }
  };

  const currentRole: UserRole = (role ?? 'guest') as UserRole;

  return (
    <nav className={cn('flex shrink-0 items-center gap-4 text-body-m font-bold', 'desktop:gap-10')}>
      {(NAV_ITEMS[currentRole] ?? []).map(({ href, label }) => (
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

          {/* 로그인 사용자는 누구나 알림 버튼 노출 (사장님 포함) */}
          <div className='relative'>
            <button
              type='button'
              aria-label='알림 확인하기'
              aria-expanded={open}
              aria-controls='notification-panel'
              onClick={() => setOpen(v => !v)}
              className='relative'
            >
              <Icon
                key={open ? 'bell-on' : 'bell-off'}
                iconName={bellIcon}
                iconSize='rg'
                bigScreenSize='md'
                ariaLabel='알림'
                className={bellColor}
              />
            </button>

            {open && (
              <Notification
                alerts={alerts}
                onRead={handleRead}
                isOpen={open}
                onClose={() => setOpen(false)}
              />
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
