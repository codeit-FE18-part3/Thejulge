import TableRow from '@/components/ui/table/TableRow';
import { TableRowProps } from '@/components/ui/table/TableRowProps';
import { UserType } from '@/types/user';

interface TableProps {
  data: TableRowProps[];
  headers: string[];
  userType: UserType;
}

// <Table headers={headers} data={data} userType={type} /> type은 확인이 좀 더 필요합니다

export default function Table({ data, headers, userType }: TableProps) {
  return (
    <div className='overflow-x-auto rounded-lg border border-gray-200'>
      <table className='min-w-full'>
        <thead>
          <tr className='bg-red-100'>
            {headers.map((header, index) => (
              <th key={index} className='px-2 py-3 text-left text-sm font-normal'>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index} rowData={row} variant={userType} />
          ))}
        </tbody>
      </table>
      <div className='flex justify-center px-3 py-2'>페이지네이션</div>
    </div>
  );
}
