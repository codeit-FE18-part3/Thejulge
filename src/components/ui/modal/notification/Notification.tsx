import Icon from '@/components/ui/icon/icon';
import { cn } from '@/lib/utils/cn';
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
  const controlled = typeof isOpen === 'boolean';
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlled ? (isOpen as boolean) : internalOpen;
  const notificationCount = alerts.filter(alert => !alert.read).length;
  const SORTED_ALERTS = [...alerts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      {!controlled && (
        <div className='relative flex justify-end'>
          <button
            onClick={() => setInternalOpen(v => !v)}
            className={`${open ? 'hidden' : 'block'} relative md:block`}
          >
            <Icon
              iconName='notificationOn'
              iconSize='sm'
              ariaLabel='알림'
              className={notificationCount > 0 ? 'bg-red-400' : 'bg-gray-400'}
            />
          </button>
        </div>
      )}

      <div
        className={cn(
          'scroll-bar mt-2 w-full overflow-hidden bg-red-100 transition-all duration-300',
          open ? 'max-h-[700px] px-5 py-6 opacity-100' : 'max-h-0 opacity-0',
          'md:absolute md:right-0 md:top-1 md:max-h-[400px] md:rounded-xl md:border md:border-gray-300 md:py-6',
          'fixed left-0 top-0 z-50 h-screen'
        )}
      >
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
            <p className='font-medium'>알림이 없습니다.</p>
          </div>
        ) : (
          <div className='flex w-full flex-col items-center gap-4 overflow-y-auto md:max-h-[368px] md:flex-1'>
            {SORTED_ALERTS.map(alert => (
              <NotificationMessage key={alert.id} alert={alert} onRead={onRead} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
