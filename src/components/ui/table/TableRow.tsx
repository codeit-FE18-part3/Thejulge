import { TableRowProps } from '@/components/ui/table/TableRowProps';
import { getTime } from '@/lib/utils/timeFormatter';

interface TableTypeVariant {
  rowData: TableRowProps;
  variant: 'employer' | 'employee';
}

const TD_BASE = 'border-b px-2 py3';
const TD_STATUS = 'border-b px-2 py-[9px]';

export default function TableRow({ rowData, variant }: TableTypeVariant) {
  const { date, startTime, endTime, duration } = getTime(rowData.startsAt, rowData.workhour);

  return (
    <tr className='text-left'>
      <td className={TD_BASE}>{rowData.name}</td>
      {variant === 'employee' ? (
        <>
          <td className={TD_BASE}>{`${date} ${startTime} ~ ${date} ${endTime}} (${duration})`}</td>
          <td className={TD_BASE}>{rowData.hourlyPay}</td>
        </>
      ) : (
        <>
          <td className={TD_BASE}>{rowData.bio}</td>
          <td className={TD_BASE}>{rowData.phone}</td>
        </>
      )}
      <td className={TD_STATUS}>{rowData.status}</td>
    </tr>
  );
}
