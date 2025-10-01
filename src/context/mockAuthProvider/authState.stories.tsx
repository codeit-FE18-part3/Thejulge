import type { User } from '@/types/user';
import type { Meta, StoryObj } from '@storybook/react';
import AuthRolePreview from './authRolePreview';
import { MockAuthProvider } from './mockAuthProvider';

const employerUser: User = {
  id: '1',
  email: 'boss@test.com',
  type: 'employer',
  name: '김사장',
  shop: {
    item: {
      id: 'shop-1',
      name: '김사장 카페',
      category: '카페',
      address1: '서울',
      address2: '101호',
      description: '테스트 카페',
      imageUrl: 'https://picsum.photos/200',
      originalHourlyPay: 10000,
    },
  },
};

const employeeUser: User = {
  id: '2',
  email: 'part@test.com',
  type: 'employee',
  name: '이알바',
  shop: null,
};

export default {
  title: 'Auth/AuthRolePreview',
  component: AuthRolePreview,
} satisfies Meta<typeof AuthRolePreview>;

type Story = StoryObj<typeof AuthRolePreview>;

export const Guest: Story = {
  decorators: [
    Story => (
      <MockAuthProvider user={null}>
        <Story />
      </MockAuthProvider>
    ),
  ],
};

export const Employer: Story = {
  decorators: [
    Story => (
      <MockAuthProvider user={employerUser}>
        <Story />
      </MockAuthProvider>
    ),
  ],
};

export const Employee: Story = {
  decorators: [
    Story => (
      <MockAuthProvider user={employeeUser}>
        <Story />
      </MockAuthProvider>
    ),
  ],
};
