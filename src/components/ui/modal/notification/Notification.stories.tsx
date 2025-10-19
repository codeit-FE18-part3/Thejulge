// Notification.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs';
import Notification, { Alert } from './Notification';

const meta: Meta<typeof Notification> = {
  title: 'Components/Notification',
  component: Notification,
  parameters: {
    layout: 'padded',
    actions: {
      handles: ['onRead'],
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  args: {
    alerts: [
      {
        id: '1',
        read: false,
        createdAt: '2025-10-03T14:14:00Z',
        result: 'accepted',
        shop: {
          item: {
            id: 'shop1',
            name: '맛집 A',
            category: '음식점',
            address1: '서울 강남구',
            address2: '역삼동 123-45',
            description: '맛있는 음식점',
            imageUrl: 'https://via.placeholder.com/150',
            originalHourlyPay: 15000,
          },
          href: '/shop/shop1',
        },
        notice: {
          item: {
            id: 'notice1',
            hourlyPay: 15000,
            description: '맛집 알바',
            startsAt: '2025-10-01T09:00:00Z',
            workhour: 8,
            closed: false,
          },
          href: '/notice/notice1',
        },
      },
      {
        id: '2',
        read: false,
        createdAt: '2025-10-02T10:50:00Z',
        result: 'rejected',
        shop: {
          item: {
            id: 'shop2',
            name: '카페 B',
            category: '카페',
            address1: '서울 서초구',
            address2: '서초동 678-90',
            description: '커피 맛집',
            imageUrl: 'https://via.placeholder.com/150',
            originalHourlyPay: 12000,
          },
          href: '/shop/shop2',
        },
        notice: {
          item: {
            id: 'notice2',
            hourlyPay: 12000,
            description: '카페 알바',
            startsAt: '2025-10-02T10:00:00Z',
            workhour: 6,
            closed: false,
          },
          href: '/notice/notice2',
        },
      },
      {
        id: '3',
        read: true,
        createdAt: '2025-10-02T08:20:00Z',
        result: 'accepted',
        shop: {
          item: {
            id: 'shop3',
            name: '도서관 C',
            category: '도서관',
            address1: '서울 마포구',
            address2: '상암동 456-78',
            description: '조용한 도서관',
            imageUrl: 'https://via.placeholder.com/150',
            originalHourlyPay: 10000,
          },
          href: '/shop/shop3',
        },
        notice: {
          item: {
            id: 'notice3',
            hourlyPay: 10000,
            description: '도서관 알바',
            startsAt: '2025-10-03T11:00:00Z',
            workhour: 4,
            closed: false,
          },
          href: '/notice/notice3',
        },
      },
      {
        id: '4',
        read: true,
        createdAt: '2025-10-01T11:20:00Z',
        result: 'rejected',
        shop: {
          item: {
            id: 'shop4',
            name: '헬스장 D',
            category: '헬스장',
            address1: '서울 송파구',
            address2: '잠실동 789-01',
            description: '피트니스 센터',
            imageUrl: 'https://via.placeholder.com/150',
            originalHourlyPay: 18000,
          },
          href: '/shop/shop4',
        },
        notice: {
          item: {
            id: 'notice4',
            hourlyPay: 18000,
            description: '헬스장 알바',
            startsAt: '2025-10-04T09:00:00Z',
            workhour: 5,
            closed: false,
          },
          href: '/notice/notice4',
        },
      },
    ] as Alert[],
  },
};
