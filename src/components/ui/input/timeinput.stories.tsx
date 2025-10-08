import { Meta, StoryObj } from '@storybook/nextjs';
import TimeInput from './TimeInput';

const meta: Meta<typeof TimeInput> = {
  title: 'Form/Input',
  component: TimeInput,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TimeInput>;

/* eslint-disable no-console */

// 시간 입력 인풋 //
export const Time: Story = {
  render: () => (
    <div>
      <TimeInput
        value={{ hours: 12, minutes: 30 }} // 초기값
        onChange={time => console.log(time)}
      />
    </div>
  ),
};
