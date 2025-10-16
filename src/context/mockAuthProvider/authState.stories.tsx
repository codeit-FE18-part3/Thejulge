// // import type { User } from '@/types/user';
// // import type { Meta, StoryObj } from '@storybook/react';
// // import AuthRolePreview from './authRolePreview';
// // import { MockAuthProvider } from './mockAuthProvider';

// // const employerUser: User = {
// //   id: '1',
// //   email: 'boss@test.com',
// //   type: 'employer',
// //   name: '김사장',
// //   shop: {
// //     item: {
// //       id: 'shop-1',
// //       name: '김사장 카페',
// //       category: '카페',
// //       address1: '서울',
// //       address2: '101호',
// //       description: '테스트 카페',
// //       imageUrl: 'https://picsum.photos/200',
// //       originalHourlyPay: 10000,
// //     },
// //   },
// // };

// // const employeeUser: User = {
// //   id: '2',
// //   email: 'part@test.com',
// //   type: 'employee',
// //   name: '이알바',
// //   shop: null,
// // };

// // interface PlaygroundArgs {
// //   role: 'guest' | 'employer' | 'employee';
// // }

// // const meta: Meta<typeof AuthRolePreview> = {
// //   title: 'Auth/AuthRolePreview',
// //   component: AuthRolePreview,
// //   tags: ['autodocs'],
// //   argTypes: {
// //     role: {
// //       control: 'select',
// //       options: ['guest', 'employer', 'employee'],
// //     },
// //   },
// // };
// // export default meta;

// // type Story = StoryObj<PlaygroundArgs>;

// // export const Playground: Story = {
// //   args: {
// //     role: 'guest', // ✅ 기본값 지정
// //   },
// //   decorators: [
// //     (Story, context) => {
// //       const { role } = context.args as PlaygroundArgs;

// //       const user = role === 'employer' ? employerUser : role === 'employee' ? employeeUser : null;

// //       return (
// //         <MockAuthProvider role={role} user={user}>
// //           <Story />
// //         </MockAuthProvider>
// //       );
// //     },
// //   ],
// // };
// export default {};

export default {};
