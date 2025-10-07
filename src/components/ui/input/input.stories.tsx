// src/components/ui/input/input.stories.tsx
import Button from '@/components/ui/button/button';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import DateTimeInput from './DateTimeInput';
import Input from './input';

const meta: Meta<typeof Input> = {
  title: 'Form/Input',
  component: Input,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Email: Story = {
  args: { id: 'email', label: '이메일', placeholder: '입력', type: 'email' },
};

export const Password: Story = {
  args: { id: 'pw', label: '비밀번호', type: 'password', placeholder: '••••••••' },
};

export const PasswordConfirm_Error: Story = {
  args: {
    id: 'pw2',
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '••••••••',
    error: '비밀번호가 일치하지 않습니다.',
  },
};

/** 시급(원) — 스토리 내부에서 숫자만 허용(컴포넌트 변경 없음) */
export const WageWithSuffix: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <Input
        id='wage'
        label='시급*'
        requiredMark
        placeholder='입력'
        inputMode='numeric'
        suffix='원'
        value={v}
        onChange={e => setV(e.currentTarget.value.replace(/\D+/g, ''))} // 숫자만
      />
    );
  },
};

/** 미니 폼 데모 */
export const MiniFormDemo: Story = {
  render: () => {
    const [wage2, setWage2] = useState('');
    return (
      <div className='max-w-md space-y-5'>
        <Input id='email2' label='이메일' placeholder='입력' type='email' />
        <Input id='pw3' label='비밀번호' type='password' placeholder='••••••••' />
        <Input
          id='pw4'
          label='비밀번호 확인'
          type='password'
          placeholder='••••••••'
          error='비밀번호가 일치하지 않습니다.'
        />
        <Input
          id='wage2'
          label='시급*'
          requiredMark
          inputMode='numeric'
          placeholder='입력'
          suffix='원'
          value={wage2}
          onChange={e => setWage2(e.currentTarget.value.replace(/\D+/g, ''))} // 숫자만
        />
        <Button variant='primary' size='md' full>
          제출
        </Button>
      </div>
    );
  },
};

// 날짜 입력 인풋 //
export const DateTimeInputStory: StoryObj = {
  render: () => (
    <div>
      <DateTimeInput />
    </div>
  ),
};
