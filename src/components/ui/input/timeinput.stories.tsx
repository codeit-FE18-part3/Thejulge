import { Meta, StoryObj } from '@storybook/nextjs';
import TimeInput from './TimeInput';

const meta: Meta<typeof TimeInput> = {
  title: 'Form/Input',
  component: TimeInput,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TimeInput>;

// 시간 입력 인풋 //
export const Time: Story = {
  render: () => (
    <div>
      <TimeInput />
    </div>
  ),
};
