import { Pagination } from '@/components/ui';
import { TableRowProps } from '@/components/ui/table/TableRowProps';
import { cn } from '@/lib/utils/cn';
import { UserType } from '@/types/user';
import TableRow from './TableRow';

interface TableProps {
  data: TableRowProps[];
  headers: string[];
  userType: UserType;
  total: number;
  limit: number;
  offset: number;
  onPageChange: (newOffset: number) => void;
}

// <Table headers={headers} data={data} userType={type} /> type은 확인이 좀 더 필요합니다

export default function Table({
  data,
  headers,
  userType,
  total,
  limit,
  offset,
  onPageChange,
}: TableProps) {
  return (
    <div className='py-[60px]'>
      <div className='px-8 text-xl font-bold md:px-10 lg:mx-auto lg:max-w-[1000px] lg:px-0'>
        {userType === 'employer' ? '신청자 목록' : '신청 목록'}
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
              {data.map(row => (
                <TableRow key={row.id} rowData={row} variant={userType} />
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
