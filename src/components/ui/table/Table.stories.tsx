import Table from '@/components/ui/table/Table';
import { TableRowProps } from '@/components/ui/table/TableRowProps';
import { UserRole, UserType } from '@/types/user';
import { Meta, StoryObj } from '@storybook/nextjs';
import { useEffect, useState } from 'react';
import { fetchTableData } from './testApi';

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
