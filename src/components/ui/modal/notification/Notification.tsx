import Icon from '@/components/ui/icon/icon';
import { cn } from '@/lib/utils/cn';
import { Notice } from '@/types/notice';
import { Shop } from '@/types/shop';
import { useState } from 'react';
import NotificationMessage from './NotificationMessage';

const NOTI_STYLE = {
  controlled: '',
  uncontrolled: '',
};
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
        role='dialog'
        aria-modal='true'
        className={cn(
          'w-full overflow-hidden bg-red-100',
          'fixed right-0 top-0 z-10 h-dvh max-h-dvh border border-gray-300',
          open ? 'px-5 py-6 opacity-100 md:max-h-[700px]' : 'max-h-0 opacity-0',
          'md:absolute md:top-[calc(100%+8px)] md:max-h-[460px] md:w-[368px] md:rounded-xl'
        )}
      >
        <div className='mb-4 flex items-center justify-between'>
          <div className='text-heading-s font-bold'>알림 {notificationCount}개</div>
          <button
            className='icon-btn'
            onClick={() => (controlled ? onClose?.() : setInternalOpen(false))}
          >
            <Icon iconName='close' iconSize='lg' ariaLabel='닫기' />
          </button>
        </div>
        {SORTED_ALERTS.length === 0 ? (
          <div className='flex flex-1 items-center justify-center'>
            <p className='font-medium'>알림이 없습니다.</p>
          </div>
        ) : (
          <div className='scroll-bar flex h-full w-full flex-col items-center gap-4 max-h-[calc(100%-48px)] md:max-h-[calc(460px-96px)]'>
            {SORTED_ALERTS.map(alert => (
              <NotificationMessage key={alert.id} alert={alert} onRead={onRead} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
