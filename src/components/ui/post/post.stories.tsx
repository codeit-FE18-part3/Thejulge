import type { Meta, StoryObj } from '@storybook/react';

import { Post } from '.';
import type { NoticeDetail } from '@/types/notice';

const upcomingNotice: NoticeDetail = {
  id: 'notice-upcoming',
  hourlyPay: 18000,
  startsAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 내일
  workhour: 4,
  description: '주말 오후 근무자를 모집합니다.',
  closed: false,
  shop: {
    href: '/shops/shop-bridge',
    item: {
      id: 'shop-bridge',
      name: '한강 브런치 카페',
      category: '카페',
      address1: '서울시 용산구',
      address2: '한강로 2가 123-45',
      description: '한강 뷰를 자랑하는 주말 전용 브런치 카페입니다.',
      imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
      originalHourlyPay: 15000,
    },
  },
};

const expiredNotice: NoticeDetail = {
  ...upcomingNotice,
  id: 'notice-expired',
  startsAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6시간 전 시작
  hourlyPay: 20000,
};

const closedNotice: NoticeDetail = {
  ...expiredNotice,
  id: 'notice-closed',
  closed: true,
};

const meta = {
  title: 'UI/Post',
  component: Post,
  parameters: {
    layout: 'centered',
  },
  args: {
    link: '/notices/notice-upcoming',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Post>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    notice: upcomingNotice,
  },
};

export const Expired: Story = {
  args: {
    notice: expiredNotice,
    link: '/notices/notice-expired',
  },
};

export const Closed: Story = {
  args: {
    notice: closedNotice,
    link: '/notices/notice-closed',
  },
};
