import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Modal from './modal';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Modal>;

/** 1) 경고(Alert) */
export const AlertWarning: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          className='rounded-lg bg-red-500 px-3 py-2 text-white'
          onClick={() => setOpen(true)}
        >
          모달 열기
        </button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          variant='warning'
          title='가게 정보를 먼저 등록해 주세요.'
          primaryText='확인'
          onPrimary={() => setOpen(false)}
        />
      </>
    );
  },
};

/** 2) 확인/취소(Confirm) */
export const ConfirmSuccess: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          className='rounded-lg bg-red-500 px-3 py-2 text-white'
          onClick={() => setOpen(true)}
        >
          모달 열기
        </button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          variant='success'
          title='신청을 거절하시겠어요?'
          secondaryText='아니오'
          onSecondary={() => setOpen(false)}
          primaryText='예'
          onPrimary={() => setOpen(false)}
        />
      </>
    );
  },
};

/** 3) 수정(correction) */
export const Correction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          className='rounded-lg bg-red-500 px-3 py-2 text-white'
          onClick={() => setOpen(true)}
        >
          모달 열기
        </button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          variant='success'
          title='수정이 완료되었습니다.'
          primaryText='확인'
          onPrimary={() => setOpen(false)}
        />
      </>
    );
  },
};
