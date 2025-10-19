// src/components/ui/dropdown/dropdown.stories.tsx
import { ADDRESS_CODE, CATEGORY_CODE, SORT_CODE } from '@/constants/dropdown';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Dropdown from './dropdown';

const OPTIONS_MAP = { CATEGORY_CODE, ADDRESS_CODE, SORT_CODE };

const meta: Meta<typeof Dropdown> = {
  title: 'UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='h-64'>
        <Story />
      </div>
    ),
  ],
  args: {
    name: 'status',
    ariaLabel: '카테고리',
    placeholder: '카테고리를 선택하세요',
    values: CATEGORY_CODE,
  },
  argTypes: {
    values: { control: 'select', options: Object.keys(OPTIONS_MAP), mapping: OPTIONS_MAP },
  },
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Medium: Story = {
  render: args => {
    const [value, setValue] = useState<string | undefined>();
    return <Dropdown {...args} selected={value} onChange={setValue} className='w-full' />;
  },
  args: { values: ADDRESS_CODE },
};

export const Small: Story = {
  render: args => {
    const [value, setValue] = useState<string | undefined>();
    return <Dropdown {...args} selected={value} onChange={setValue} />;
  },
  args: { size: 'sm', name: 'status-sm' },
};

export const WithInitialValue: Story = {
  render: args => {
    const [value, setValue] = useState<string | undefined>(CATEGORY_CODE[1]);
    return <Dropdown {...args} selected={value} onChange={setValue} />;
  },
};
