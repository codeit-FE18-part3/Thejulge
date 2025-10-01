import { Alert } from './Notification';

export default function NotificationMessage({
  alert,
  onRead,
}: {
  alert: Alert;
  onRead: (id: string) => void;
}) {
  return (
    <button onClick={() => onRead(alert.id)}>
      <p>{alert.shop?.item.name ?? '알림'}</p>
      <span>{new Date(alert.createdAt).toLocaleString()}</span>
    </button>
  );
}
