import { Pagination } from '@/components/ui';
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
}

export default function Table({
  tableData,
  headers,
  userRole,
  total,
  limit,
  offset,
  onPageChange,
}: TableProps) {
  return (
    <div className='py-[60px]'>
      <div className='px-8 text-xl font-bold md:px-10 lg:mx-auto lg:max-w-[1000px] lg:px-0'>
        {userRole === 'employer' ? '신청자 목록' : '신청 목록'}
      </div>
      <div className='m-7 overflow-hidden rounded-lg border bg-white lg:mx-auto lg:max-w-[1000px]'>
        <div className='scroll-bar overflow-x-auto'>
          <table className='w-full table-fixed border-collapse'>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className={cn(
                      'md:borde-r-0 bg-red-100 px-2 py-3 text-left text-xs font-normal',
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
            <tbody>
              {tableData.map(row => (
                <TableRow key={row.id} {...row} rowData={row} userRole={userRole} />
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex justify-center px-3 py-2'>
          <Pagination total={total} limit={limit} offset={offset} onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  );
}
