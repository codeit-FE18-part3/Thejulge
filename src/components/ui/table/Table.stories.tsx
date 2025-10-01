import Table from '@/components/ui/table/Table';
import { TableRowProps } from '@/components/ui/table/TableRowProps';
import { Meta, StoryObj } from '@storybook/nextjs';
import { useEffect, useState } from 'react';
import { fetchTableData, UserType } from './testApi';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  argTypes: {
    userType: {
      control: { type: 'radio' },
      options: ['employer', 'employee'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

function TableWithTestApi({ userType }: { userType: UserType }) {
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<TableRowProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetchTableData(userType);
      setHeaders(res.headers);
      setData(res.data as TableRowProps[]);
    };
    getData();
  }, [userType]);

  return <Table headers={headers} data={data} userType={userType} />;
}

export const TableExample: Story = {
  args: {
    userType: 'employer',
  },
  render: args => <TableWithTestApi userType={args.userType} />,
};
