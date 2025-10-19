import Table from '@/components/ui/table/Table';
import { TableRowProps } from '@/components/ui/table/TableRowProps';
import { UserRole, UserType } from '@/types/user';
import { Meta, StoryObj } from '@storybook/nextjs';
import { useEffect, useState } from 'react';

const fetchTableData = async (userRole: UserRole) => {
  return new Promise<{ headers: string[]; data: unknown[] }>(resolve => {
    setTimeout(() => {
      if (userRole === 'employer') {
        resolve({
          headers: ['신청자', '소개', '전화번호', '상태'],
          data: [
            {
              name: '김강현',
              bio: '최선을 다해 열심히 일합니다. 다수의 업무 경험을 바탕으로 확실한 일처리 보여드리겠습니다.',
              phone: '010-1234-5678',
              status: 'pending',
            },
            {
              name: '서혜진',
              bio: '열심히 하겠습니다!',
              phone: '010-1111-2222',
              status: 'rejected',
            },
            {
              name: '주진혁',
              bio: '성실한 자세로 열심히 일합니다.',
              phone: '010-3333-4444',
              status: 'approved',
            },
            {
              name: '장민혁',
              bio: '일을 꼼꼼하게 하는 성격입니다.',
              phone: '010-5555-5555',
              status: 'approved',
            },
            {
              name: '고기훈',
              bio: '하루라도 최선을 다해서 일하겠습니다!',
              phone: '010-6666-6666',
              status: 'rejected',
            },
            {
              name: '최현수',
              bio: '열심히 하겠습니다!',
              phone: '010-1123-5448',
              status: 'pending',
            },
            {
              name: '강주하',
              bio: '성실한 자세로 열심히 일합니다.',
              phone: '010-4123-2323',
              status: 'approved',
            },
            {
              name: '배수지',
              bio: '열심히 배우고 일하겠습니다!',
              phone: '010-3123-1111',
              status: 'approved',
            },
            {
              name: '강규하',
              bio: '꼼꼼한 일처리 보여드리겠습니다.',
              phone: '010-5123-0098',
              status: 'rejected',
            },
            {
              name: '고선영',
              bio: '최선을 다해서 일하겠습니다!',
              phone: '010-6662-6326',
              status: 'peding',
            },
            {
              name: '박하연',
              bio: '뽑아주시면 열심히 하겠습니다.',
              phone: '010-1277-1385',
              status: 'pending',
            },
            {
              name: '김연아',
              bio: '잘 부탁드립니다!',
              phone: '010-1232-6216',
              status: 'rejected',
            },
          ],
        });
      } else {
        resolve({
          headers: ['가게', '일자', '시급', '상태'],
          data: [
            {
              name: '너구리네 라면집',
              startsAt: '2025-10-01T11:00',
              workhour: 2,
              hourlyPay: '12,500원',
              status: 'pending',
            },
            {
              name: '너구리네 라면집',
              startsAt: '2025-10-01T11:00',
              workhour: 2,
              hourlyPay: '12,500원',
              status: 'rejected',
            },
            {
              name: '너구리네 라면집',
              startsAt: '2025-10-01T11:00',
              workhour: 2,
              hourlyPay: '12,500원',
              status: 'approved',
            },
            {
              name: '너구리네 라면집',
              startsAt: '2025-10-01T11:00',
              workhour: 2,
              hourlyPay: '12,500원',
              status: 'rejected',
            },
            {
              name: '너구리네 라면집',
              startsAt: '2025-10-01T11:00',
              workhour: 2,
              hourlyPay: '12,500원',
              status: 'approved',
            },
            {
              name: '너구리네 라면집',
              startsAt: '2025-10-01T11:00',
              workhour: 2,
              hourlyPay: '12,500원',
              status: 'approved',
            },
          ],
        });
      }
    });
  });
};

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof Table>;

function TableWithTestApi({ userRole }: { userRole: UserRole }) {
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<TableRowProps[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;

  useEffect(() => {
    const getData = async () => {
      const res = await fetchTableData(userRole);
      setHeaders(res.headers);
      setData(res.data as TableRowProps[]);
    };
    getData();
  }, [userRole]);

  const count = data.length;
  const paginatedData = data.slice(offset, offset + limit);

  return (
    <Table
      headers={headers}
      tableData={paginatedData}
      userRole={userRole}
      total={count}
      limit={limit}
      offset={offset}
      onPageChange={setOffset}
      onStatusUpdate={() => {}}
      shopId=''
      noticeId=''
    />
  );
}

export const EmployerTable: Story = {
  args: {
    userRole: 'employer',
  },
  render: args => <TableWithTestApi userRole={args.userRole as UserType} />,
};

export const EmployeeTable: Story = {
  args: {
    userRole: 'employee',
  },
  render: args => <TableWithTestApi userRole={args.userRole as UserType} />,
};
