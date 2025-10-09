import type { Meta, StoryObj } from '@storybook/nextjs';
import Link from 'next/link';
import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
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

/* Link로 렌더링 (as prop 사용 예) */
export const AsLink: Story = {
  args: {
    as: Link,
    href: '/profile/create',
    variant: 'primary',
    full: true,
    children: '내 프로필 등록하기',
  },
};

/**  새 프리셋: xs38 (모바일 38 → PC 48) */
export const Size_XS38: Story = {
  args: { children: '38→48 버튼', variant: 'primary', size: 'xs38' },
};

/** 48→48 유지 프리셋 */
export const Size_LGFixed: Story = {
  args: { children: '48→48 고정', variant: 'primary', size: 'lgFixed' },
};

/** Bold 오버라이드 확인 (className 병합) */
export const BoldOverride: Story = {
  args: { children: 'Bold 버튼', variant: 'secondary', size: 'md', className: 'font-bold' },
};
