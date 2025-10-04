import { getTime } from '@/lib/utils/getTime';
import { timeAgo } from '@/lib/utils/timeAgo';
import { clsx } from 'clsx';
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

  const DATE_RANGE = getTime(alert.notice.item.startsAt, alert.notice.item.workhour);

  const NOTIFICATION_MESSAGE_CONTAINER = clsx(
    'w-full gap-2 break-words rounded border border-gray-200 bg-white px-3 py-4'
  );

  return (
    <div className={NOTIFICATION_MESSAGE_CONTAINER}>
      <button onClick={() => onRead(alert.id)} className='w-full text-left'>
        <div className='flex flex-col gap-2'>
          <ResultBadge result={alert.result} />
          <p
            className={clsx('text-sm', {
              'text-gray-400': alert.read,
            })}
          >
            {`${alert.shop.item.name} (${DATE_RANGE.date} ${DATE_RANGE.startTime} ~ 
            ${DATE_RANGE.endTime}) 공고 지원이 `}
            <span
              className={clsx({
                'text-gray-500': alert.read,
                'text-blue-200': !alert.read && alert.result === 'accepted',
                'text-red-400': !alert.read && alert.result === 'rejected',
              })}
            >
              {RESULT_TEXT}
            </span>
            되었어요.
          </p>
          <span className='text-xs text-gray-400'>{timeAgo(alert.createdAt)}</span>
        </div>
      </button>
    </div>
  );
}
