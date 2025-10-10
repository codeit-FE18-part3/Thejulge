import type { NoticeCard } from '@/types/notice';
import type { Meta, StoryObj } from '@storybook/react';
import { Notice } from '.';

const oneDayMs = 24 * 60 * 60 * 1000;

const baseNotice: NoticeCard = {
  id: 'notice-001',
  hourlyPay: 20000,
  startsAt: new Date(Date.now() + oneDayMs).toISOString(),
  workhour: 4,
  description: '주말 점심 시간대 근무자를 모집합니다.',
  closed: false,
  shopId: 'shop-bridge',
  name: '한강 브런치 카페',
  category: '카페',
  address1: '서울시 용산구',
  shopDescription: '한강 뷰를 자랑하는 브런치 카페',
  imageUrl: 'https://picsum.photos/id/1080/640/360',
  originalHourlyPay: 18000,
};

const meta = {
  title: 'UI/Notice',
  component: Notice,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div className='mx-auto w-full max-w-[1094px] p-6'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Notice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    notice: baseNotice,
    variant: 'notice',
    children: <button className='base-button'>지원하기</button>,
  },
};

export const ShopVariant: Story = {
  args: {
    notice: {
      ...baseNotice,
      name: '내 가게 한강 브런치',
      category: '브런치',
    },
    variant: 'shop',
    children: <button className='base-button'>공고 등록</button>,
  },
};
