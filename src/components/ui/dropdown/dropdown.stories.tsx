import { ADDRESS_CODE, CATEGORY_CODE, SORT_CODE } from '@/constants/dropdown';
import type { Meta, StoryObj } from '@storybook/nextjs';
import Dropdown from './dropdown';
const OPTIONS_MAP = {
  CATEGORY_CODE,
  ADDRESS_CODE,
  SORT_CODE,
};
const meta: Meta<typeof Dropdown> = {
  title: 'UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: {
    name: 'status',
    label: '카테고리',
    placeholder: '카테고리를 선택하세요',
    values: CATEGORY_CODE, // 기본값
  },
  argTypes: {
    values: {
      control: 'select',
      options: Object.keys(OPTIONS_MAP),
      mapping: OPTIONS_MAP,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Medium: Story = {
  args: {
    values: ADDRESS_CODE,
    className: 'w-full',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    name: 'status-sm',
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: CATEGORY_CODE[1],
  },
};
