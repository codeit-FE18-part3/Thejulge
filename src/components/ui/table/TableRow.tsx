import { StatusBadge } from '@/components/ui/badge';
import { StatusType } from '@/components/ui/badge/StatusBadge';
import { TableRowProps } from '@/components/ui/table/TableRowProps';
import { cn } from '@/lib/utils/cn';
import { getTime } from '@/lib/utils/dateFormatter';
import { UserRole } from '@/types/user';
import { useState } from 'react';

interface TableTypeVariant {
  rowData: TableRowProps;
  userRole: UserRole;
}

const TD_BASE = 'border-b border-r px-3 py-5 text-base gap-3 md:border-r-0';
const TD_STATUS = 'border-b px-2 py-[9px]';

export default function TableRow({ rowData, userRole: userRole }: TableTypeVariant) {
  const { date, startTime, endTime, duration } = getTime(rowData.startsAt, rowData.workhour);
  const [status, setStatus] = useState<StatusType>(rowData.status as StatusType);

  const handleStatusChange = (id: string, newStatus: StatusType) => {
    setStatus(newStatus);
  };

  const handleApprove = () => setStatus('accepted');
  const handleReject = () => setStatus('rejected');

  return (
    <tr className='text-left'>
      <td className={cn(TD_BASE, 'sticky left-0 z-10 bg-white')}>{rowData.name}</td>

      {userRole === 'employee' ? (
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
          applicationId={rowData.id}
          status={status}
          userRole={userRole}
          onStatusChange={handleStatusChange}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </td>
    </tr>
  );
}
