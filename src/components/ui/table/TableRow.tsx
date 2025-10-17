import { StatusBadge } from '@/components/ui/badge';
import { StatusType } from '@/components/ui/badge/StatusBadge';
import { TableRowProps } from '@/components/ui/table/TableRowProps';
import { cn } from '@/lib/utils/cn';
import { getTime } from '@/lib/utils/dateFormatter';
import { useState } from 'react';

interface TableTypeVariant {
  rowData: TableRowProps;
  variant: 'employer' | 'employee';
}

const TD_BASE = 'border-b border-r px-3 py-5 text-base gap-3 md:border-r-0';
const TD_STATUS = 'border-b px-2 py-[9px]';

export default function TableRow({ rowData, variant }: TableTypeVariant) {
  const { date, startTime, endTime, duration } = getTime(rowData.startsAt, rowData.workhour);
  const [status, setStatus] = useState<StatusType>(rowData.status as StatusType);

  const handleApprove = () => setStatus('accepted');
  const handleReject = () => setStatus('rejected');

  return (
    <tr className='text-left'>
      <td className={cn(TD_BASE, 'sticky left-0 z-10 bg-white')}>{rowData.name}</td>
      {variant === 'employee' ? (
        <>
          <td className={TD_BASE}>{`${date} ${startTime} ~ ${date} ${endTime} (${duration})`}</td>
          <td className={TD_BASE}>{rowData.hourlyPay}</td>
        </>
      ) : (
        <>
          <td className={TD_BASE}>{rowData.bio}</td>
          <td className={TD_BASE}>{rowData.phone}</td>
        </>
      )}
      <td className={TD_STATUS}>
        <StatusBadge
          status={status}
          variant={variant}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </td>
    </tr>
  );
}
