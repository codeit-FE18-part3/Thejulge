import { TableRowProps } from '@/components/ui/table/TableRowProps';
import { getTime } from '@/lib/utils/getTime';

interface TableTypeVariant {
  rowData: TableRowProps;
  variant: 'employer' | 'employee';
}

export default function TableRow({ rowData, variant }: TableTypeVariant) {
  if (variant === 'employee') {
    return (
      <tr className='text-left'>
        <td className='border-b px-2 py-3'>{rowData.name}</td>
        <td className='border-b px-2 py-3'>
          {`${getTime(rowData.startsAt, 0)} ~ ${getTime(rowData.startsAt, rowData.workhour)} (${rowData.workhour}시간)`}
        </td>
        <td className='border-b px-2 py-3'>{rowData.hourlyPay}</td>
        <td className='border-b px-2 py-[9px]'>{rowData.status}</td>
      </tr>
    );
  }
  return (
    <tr className='text-left'>
      <td className='border-b px-2 py-3'>{rowData.name}</td>
      <td className='border-b px-2 py-3'>{rowData.bio}</td>
      <td className='border-b px-2 py-3'>{rowData.phone}</td>
      <td className='border-b px-2 py-[9px]'>{rowData.status}</td>
    </tr>
  );
}