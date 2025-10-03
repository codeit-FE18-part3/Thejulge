import { Meta, StoryFn } from '@storybook/nextjs';
import Notification from './Notification';

/* eslint-disable no-console */

const meta: Meta<typeof Notification> = {
  title: 'Components/Notification',
  component: Notification,
};

export default meta;

const Template: StoryFn<typeof Notification> = args => <Notification {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  onClose: () => console.log('Close clicked'),
  onRead: (id: string) => console.log('Read notification', id),
  alerts: [
    {
      id: '1',
      read: false,
      createdAt: new Date().toISOString(),
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
      read: true,
      createdAt: new Date().toISOString(),
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
  ],
};
