import { Button, DateInput, Input, Modal, TimeInput } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import axiosInstance from '@/lib/axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
interface NoticeLoad {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}
const EmployerNoticeRegisterPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [wage, setWage] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [workhour, setWorkhour] = useState<number>();
  const [description, setDescription] = useState('');

  const [accessModal, setAccessModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [modalHandler, setModalHandler] = useState<() => void>(() => () => {});

  useEffect(() => {
    if (user && !user.shop) {
      setAccessModal(true);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date || !time || !wage || !workhour || !description) return;
    if (!user?.shop) return;
    const combinedDateTime = new Date(date);
    combinedDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
    const payload: NoticeLoad = {
      hourlyPay: Number(wage),
      startsAt: combinedDateTime.toISOString(),
      workhour,
      description,
    };

    try {
      const response = await axiosInstance.post(`/shops/${user.shop.item.id}/notices`, payload);
      const noticeId = response.data.item.id;

      if (!noticeId) {
        alert('등록된 공고 ID를 가져올 수 없습니다.');
        return;
      }

      const handleModalConfirm = async () => {
        setSuccessModal(false);
        await router.push(`/employer/shops/${user.shop!.item.id}/notices/${noticeId}`);
      };

      setModalHandler(() => handleModalConfirm);
      setSuccessModal(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : '공고 등록 중 오류 발생');
    }
  };

  return (
    <div className='p-4'>
      <p className='font-weight-700 mb-4 text-3xl font-bold'>공고 등록</p>
      <form onSubmit={handleSubmit} className='flex w-full flex-col gap-4'>
        <div className='grid grid-cols-2 gap-6'>
          <Input
            id='wage'
            label='시급'
            requiredMark
            placeholder='12,500'
            inputMode='numeric'
            suffix='원'
            value={wage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWage(e.currentTarget.value.replace(/\D+/g, ''))
            }
          />
          <Input
            id='workhour'
            label='업무 시간'
            requiredMark
            placeholder='4'
            inputMode='numeric'
            suffix='시간'
            value={workhour?.toString() ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWorkhour(Number(e.currentTarget.value))
            }
          />
          <DateInput
            label='시작 날짜'
            requiredMark
            value={date ?? undefined}
            onChange={selectedDate => {
              if (selectedDate instanceof Date) {
                setDate(selectedDate);
              } else {
                setDate(new Date(selectedDate));
              }
            }}
          />
          <TimeInput
            label='시작 시간'
            requiredMark
            value={time ?? undefined}
            onChange={(selectedTime: Date | null) => setTime(selectedTime)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='description' className='text-sm font-medium'>
            공고 설명
          </label>
          <textarea
            id='description'
            name='description'
            className='rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            rows={4}
            placeholder='공고에 대한 설명을 입력하세요.'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <Button
          type='submit'
          variant='primary'
          size='lg'
          className='mt-5 w-full'
          disabled={!wage || !date || !time || !workhour || !description}
        >
          등록하기
        </Button>
      </form>

      {accessModal && (
        <Modal
          open={accessModal}
          title='접근 권한이 없습니다'
          variant='warning'
          primaryText='확인'
          onPrimary={() => router.replace('/')} // 확인 누르면 메인으로
          onClose={() => setAccessModal(false)}
        />
      )}

      <Modal
        open={successModal}
        onClose={() => setSuccessModal(false)}
        title='등록 완료'
        variant='success'
        primaryText='확인'
        onPrimary={modalHandler}
      />
    </div>
  );
};
export default EmployerNoticeRegisterPage;
