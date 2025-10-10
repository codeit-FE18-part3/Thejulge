import { Meta, StoryObj } from '@storybook/nextjs';
import DateInput from './DateInput';
import Input from './input';

const meta: Meta<typeof DateInput> = {
  title: 'Form/Input',
  component: DateInput,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Input>;

// 날짜 입력 인풋 //
export const Date: Story = {
  render: () => (
    <div>
      <DateInput />
    </div>
  ),
};
