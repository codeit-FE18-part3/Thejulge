import { Alert } from './Notification';
import ResultBadge from './ResultBadge';

export default function NotificationMessage({
  alert,
  onRead,
}: {
  alert: Alert;
  onRead: (id: string) => void;
}) {
  const RESULT_TEXT = alert.result === 'accepted' ? '승인' : '거절';

  return (
    <div className='w-full gap-2 break-words rounded border border-gray-200 bg-white px-3 py-4'>
      <button onClick={() => onRead(alert.id)} className='w-full text-left'>
        <div className='flex flex-col gap-1'>
          <ResultBadge result={alert.result} />
          <p className='text-[14px]'>
            {`${alert.shop?.item.name} 공고 지원이 ${RESULT_TEXT}되었어요.`}
          </p>
          <span>{new Date(alert.createdAt).toLocaleString()}</span>
        </div>
      </button>
    </div>
  );
}
