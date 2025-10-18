import Icon from '@/components/ui/icon/icon';
import { Notice } from '@/types/notice';
import { Shop } from '@/types/shop';
import { useState } from 'react';
import NotificationMessage from './NotificationMessage';

export interface Alert {
  id: string;
  createdAt: string;
  result: 'accepted' | 'rejected';
  read: boolean;
  shop: { item: Shop; href?: string };
  notice: { item: Notice; href?: string };
}

interface NotificationProps {
  alerts: Alert[];
  onRead: (id: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Notification({ alerts, onRead, isOpen, onClose }: NotificationProps) {
  // 제어 모드인지 판별
  const controlled = typeof isOpen === 'boolean';
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlled ? (isOpen as boolean) : internalOpen;
  const notificationCount = alerts.filter(alert => !alert.read).length;
  const SORTED_ALERTS = [...alerts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
     {/* 제어 모드가 아니면 내부 트리거 버튼을 노출 */}
      {!controlled && (
        <div className='relative flex justify-end'>
          <button
            onClick={() => setInternalOpen(v => !v)}
            className={`${open ? 'hidden' : 'block'} relative md:block`}
          >
            <Icon iconName='notificationOn' iconSize='sm' ariaLabel='알림' />
          </button>
        </div>
      )}
      {open && (
        <div className='flex min-h-screen flex-col gap-4 bg-red-100 px-5 py-10'>
          <div className='flex justify-between'>
            <div className='text-[20px] font-bold'>알림 {notificationCount}개</div>
            <div>
              <button onClick={() => (controlled ? onClose?.() : setInternalOpen(false))}>
                <Icon iconName='close' iconSize='lg' ariaLabel='닫기' />
              </button>
            </div>
          </div>
          <div></div>
          {SORTED_ALERTS.length === 0 ? (
            <div className='flex flex-1 items-center justify-center'>
              <p>알림이 없습니다.</p>
            </div>
          ) : (
            <div className='flex flex-col items-center gap-4'>
              {SORTED_ALERTS.map(alert => (
                <NotificationMessage key={alert.id} alert={alert} onRead={onRead} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
