import Icon from '@/components/ui/icon/icon';
import { Shop } from '@/types/shop';
import NotificationMessage from './NotificationMessage';

export interface Alert {
  id: string;
  createdAt: string;
  result: 'accepted' | 'rejected';
  read: boolean;
  shop?: { item: Shop; href?: string };
}

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: Alert[];
  onRead: (id: string) => void;
}

export default function Notification({ isOpen, onClose, alerts, onRead }: NotificationProps) {
  if (!isOpen) return null;

  const notificationCount = alerts.filter(alert => !alert.read).length;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <div>알림 {notificationCount}개</div>
        <div>
          <Icon iconName='close' iconSize='sm' ariaLabel='닫기' onClick={onClose} />
        </div>
      </div>
      <div className='flex flex-col items-center gap-4'>
        {alerts.length === 0 ? (
          <p>알림이 없습니다.</p>
        ) : (
          alerts.map(alert => <NotificationMessage key={alert.id} alert={alert} onRead={onRead} />)
        )}
      </div>
    </div>
  );
}
