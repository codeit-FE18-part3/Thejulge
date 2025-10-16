import Table from '@/components/ui/table/Table';
import { TableRowProps } from '@/components/ui/table/TableRowProps';
import { UserType } from '@/types/user';
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

function TableWithTestApi({ userType }: { userType: UserType }) {
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<TableRowProps[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;

  useEffect(() => {
    const getData = async () => {
      const res = await fetchTableData(userType);
      setHeaders(res.headers);
      setData(res.data as TableRowProps[]);
    };
    getData();
  }, [userType]);

  const count = data.length;
  const paginatedData = data.slice(offset, offset + limit);

  return (
    <Table
      headers={headers}
      data={paginatedData}
      userType={userType}
      total={count}
      limit={limit}
      offset={offset}
      onPageChange={setOffset}
    />
  );
}

export const EmployerTable: Story = {
  args: {
    userType: 'employer',
  },
  render: args => <TableWithTestApi userType={args.userType as UserType} />,
};

export const EmployeeTable: Story = {
  args: {
    userType: 'employee',
  },
  render: args => <TableWithTestApi userType={args.userType as UserType} />,
};
