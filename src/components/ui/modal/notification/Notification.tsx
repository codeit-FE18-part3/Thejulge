import Icon from '@/components/ui/icon/icon';
import { Shop } from '@/types/shop';
import { useState } from 'react';
import NotificationMessage from './NotificationMessage';

export interface Alert {
  id: string;
  createdAt: string;
  result: 'accepted' | 'rejected';
  read: boolean;
  shop?: { item: Shop; href?: string };
}

interface NotificationProps {
  alerts: Alert[];
  onRead: (id: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Notification({ alerts, onRead }: NotificationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const notificationCount = alerts.filter(alert => !alert.read).length;

  return (
    <>
      <div className='relative flex justify-end'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${isOpen ? 'hidden' : 'block'} relative md:block`}
        >
          <Icon iconName='notificationOn' iconSize='sm' ariaLabel='알림' />
        </button>
      </div>
      {isOpen && (
        <div className='flex min-h-screen flex-col gap-4 bg-red-100 px-5 py-10'>
          <div className='flex justify-between'>
            <div className='text-[20px] font-bold'>알림 {notificationCount}개</div>
            <div>
              <button onClick={() => setIsOpen(false)}>
                <Icon iconName='close' iconSize='lg' ariaLabel='닫기' />
              </button>
            </div>
          </div>
          <div></div>
          {alerts.length === 0 ? (
            <div className='flex flex-1 items-center justify-center'>
              <p>알림이 없습니다.</p>
            </div>
          ) : (
            <div className='flex flex-col items-center gap-4'>
              {alerts.map(alert => (
                <NotificationMessage key={alert.id} alert={alert} onRead={onRead} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
