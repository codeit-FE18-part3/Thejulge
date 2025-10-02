import { Alert } from './Notification';
import ResultBadge from './ResultBadge';

export default function NotificationMessage({
  alert,
  onRead,
}: {
  alert: Alert;
  onRead: (id: string) => void;
}) {
  return (
    <div className='w-full gap-2 break-words rounded border border-gray-200 bg-white px-3 py-4 text-center'>
      <button onClick={() => onRead(alert.id)} className='w-full'>
        <div className='flex flex-col'>
          <ResultBadge result={alert.result} />
          <p>{alert.shop?.item.name ?? '알림'}</p>
          <span>{new Date(alert.createdAt).toLocaleString()}</span>
        </div>
      </button>
    </div>
  );
}
