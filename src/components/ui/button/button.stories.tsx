import type { Meta, StoryObj } from '@storybook/react';
import Button from './button';

/** 버튼 스토리: 최소 설정 + 새 변형만 추가 */
const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Button>;

/** Primary */
export const Primary: Story = {
  args: { children: '로그인 하기', variant: 'primary', size: 'lg' },
};

/** Secondary */
export const Secondary: Story = {
  args: { children: '로그인 하기', variant: 'secondary', size: 'lg' },
};

/** Disabled */
export const Disabled: Story = {
  args: { children: '신청 불가', variant: 'disabled', size: 'lg' },
};

/** 승인/거절 아웃라인 버튼 */
export const ApproveReject: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Button variant='approve' size='md'>
        승인하기
      </Button>
      <Button variant='reject' size='md'>
        거절하기
      </Button>
    </div>
  ),
};
