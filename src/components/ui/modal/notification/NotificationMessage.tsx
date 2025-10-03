import { getTime } from '@/lib/utils/getTime';
import { Alert } from './Notification';
import ResultBadge from './ResultBadge';

const RESULT_STYLES: Record<Alert['result'], string> = {
  accepted: 'text-blue-200',
  rejected: 'text-red-400',
};

export default function NotificationMessage({
  alert,
  onRead,
}: {
  alert: Alert;
  onRead: (id: string) => void;
}) {
  const RESULT_TEXT = alert.result === 'accepted' ? '승인' : '거절';

  const DATE_RANGE = getTime(alert.notice.item.startsAt, alert.notice.item.workhour);

  return (
    <div className='w-full gap-2 break-words rounded border border-gray-200 bg-white px-3 py-4'>
      <button onClick={() => onRead(alert.id)} className='w-full text-left'>
        <div className='flex flex-col gap-1'>
          <ResultBadge result={alert.result} />
          <p className='text-[14px]'>
            {alert.shop.item.name} ({DATE_RANGE.DATE} {DATE_RANGE.START_TIME} ~{' '}
            {DATE_RANGE.END_TIME}) 공고 지원이{' '}
            <span className={RESULT_STYLES[alert.result]}>{RESULT_TEXT}</span>
            되었어요.
          </p>
          <span>{new Date(alert.createdAt).toLocaleString()}</span>
        </div>
      </button>
    </div>
  );
}
