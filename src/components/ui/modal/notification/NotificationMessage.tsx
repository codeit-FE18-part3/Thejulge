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
  const {
    id,
    result,
    read,
    createdAt,
    shop: {
      item: { name: shopName },
    },
    notice: {
      item: { startsAt, workhour },
    },
  } = alert;
  const RESULT_TEXT = result === 'accepted' ? '승인' : '거절';

  const DATE_RANGE = getTime(startsAt, workhour);

  const NOTIFICATION_MESSAGE_CONTAINER = clsx(
    'w-full gap-2 break-words rounded border border-gray-200 bg-white px-3 py-4'
  );

  return (
    <div className={NOTIFICATION_MESSAGE_CONTAINER}>
      <button onClick={() => onRead(id)} className='w-full text-left'>
        <div className='flex flex-col gap-2'>
          <ResultBadge result={result} />
          <p
            className={clsx('text-sm', {
              'text-gray-400': read,
            })}
          >
            {`${shopName} (${DATE_RANGE.date} ${DATE_RANGE.startTime} ~ 
            ${DATE_RANGE.endTime}) 공고 지원이 `}
            <span
              className={clsx({
                'text-gray-500': read,
                'text-blue-200': !read && result === 'accepted',
                'text-red-400': !read && result === 'rejected',
              })}
            >
              {RESULT_TEXT}
            </span>
            되었어요.
          </p>
          <span className='text-xs text-gray-400'>{timeAgo(createdAt)}</span>
        </div>
      </button>
    </div>
  );
}
