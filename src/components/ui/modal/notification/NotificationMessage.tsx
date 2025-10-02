import { Alert } from './Notification';

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
        <p>{alert.shop?.item.name ?? '알림'}</p>
        <span>{new Date(alert.createdAt).toLocaleString()}</span>
      </button>
    </div>
  );
}
