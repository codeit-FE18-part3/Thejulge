import { Pagination } from '@/components/ui';
import { StatusType } from '@/components/ui/badge/StatusBadge';
import { TableRowProps } from '@/components/ui/table/TableRowProps';
import { cn } from '@/lib/utils/cn';
import { UserRole } from '@/types/user';
import TableRow from './TableRow';

interface TableProps {
  tableData: TableRowProps[];
  userRole: UserRole;
  headers: string[];
  total: number;
  limit: number;
  offset: number;
  onPageChange: (newOffset: number) => void;
  onStatusUpdate: (id: string, newStatus: StatusType, shopId?: string, noticeId?: string) => void;
  shopId?: string;
  noticeId?: string;
  applyNotice?: (shopId: string, noticeId: string) => void;
  cancelNotice?: (shopId: string, noticeId: string) => void;
}

export default function Table({
  tableData,
  headers,
  userRole,
  total,
  limit,
  offset,
  onPageChange,
  onStatusUpdate,
  shopId,
  noticeId,
}: TableProps) {
  return (
    <>
      <h2 className='mb-4 text-heading-l font-bold tablet:mb-8'>
        {userRole === 'employer' ? '신청자 목록' : '신청 내역'}
      </h2>
      <div className='overflow-hidden rounded-lg border bg-white'>
        <div className='scroll-bar overflow-x-auto'>
          <table className='w-full table-fixed border-collapse'>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className={cn(
                      'bg-red-100 px-2 py-3 text-left text-body-l font-normal md:border-0',
                      index < headers.length - 1 && 'border-r md:border-r-0',
                      index === 0 && 'sticky left-0 z-10 w-[200px]',
                      index > 0 && index < headers.length - 1 && 'w-[245px]',
                      index === headers.length - 1 && 'w-[220px] md:w-[230px]'
                    )}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='[&>tr:last-child>td]:border-b-0'>
              {tableData.map(row => (
                <TableRow
                  key={row.id}
                  {...row}
                  rowData={row}
                  userRole={userRole}
                  shopId={shopId}
                  noticeId={noticeId}
                  onStatusUpdate={onStatusUpdate}
                />
              ))}
            </tbody>
          </table>
        </div>

        {offset >= 2 && (
          <div className='flex justify-center px-3 py-2'>
            <Pagination total={total} limit={limit} offset={offset} onPageChange={onPageChange} />
          </div>
        )}
      </div>
    </>
  );
}
