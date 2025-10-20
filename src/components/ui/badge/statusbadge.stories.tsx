import type { Meta, StoryObj } from '@storybook/nextjs';
import { default as StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'UI/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof StatusBadge>;

// Accept 승인 완료 뱃지
export const Accept: Story = {
  args: {
    status: 'accepted',
  },
};

// Reject 거절 뱃지
export const Reject: Story = {
  args: {
    status: 'rejected',
  },
};

// Pending 대기중 employee 뱃지
export const PendingEmployee: Story = {
  args: {
    status: 'pending',
  },
};

// Pending 대기중 employer
export const PendingEmployer: Story = {
  args: {
    status: 'pending',
  },
};
