import type { Meta, StoryObj } from '@storybook/react';

import { Post } from '.';
import type { PostCard } from '@/types/notice';

const baseNotice: PostCard = {
  id: 'notice-001',
  hourlyPay: 18000,
  startsAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
  workhour: 4,
  description: '주말 점심 시간대 근무자를 모집합니다.',
  closed: false,
  name: '한강 브런치 카페',
  address1: '서울시 용산구',
  imageUrl: 'https://picsum.photos/id/1080/640/360',
  originalHourlyPay: 15000,
  href: '/notices/notice-001',
};

const meta = {
  title: 'UI/Post',
  component: Post,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Post>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    notice: baseNotice,
  },
};

export const Expired: Story = {
  args: {
    notice: {
      ...baseNotice,
      id: 'notice-002',
      startsAt: '2023-08-01T11:00:00Z',
      hourlyPay: 20000,
      originalHourlyPay: 13000,
      href: '/notices/notice-002',
    },
  },
};

export const Closed: Story = {
  args: {
    notice: {
      ...baseNotice,
      id: 'notice-003',
      closed: true,
      hourlyPay: 9500,
      originalHourlyPay: 9000,
      startsAt: '2023-07-01T09:00:00Z',
      href: '/notices/notice-003',
    },
  },
};
