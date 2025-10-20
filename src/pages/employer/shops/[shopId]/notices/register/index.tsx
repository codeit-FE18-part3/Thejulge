import { Container, Wrapper } from '@/components/layout';
import { Button, DateInput, Input, Modal, TimeInput } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import axiosInstance from '@/lib/axios';
import { cn } from '@/lib/utils/cn';
import { TimeValue } from '@/types/calendar';
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

  const [pastTimeModal, setPastTimeModal] = useState(false);
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

    const now = new Date();
    const period = time.getHours() >= 12 ? '오후' : '오전';
    const hours24 =
      period === '오후' && time!.getHours() !== 12
        ? time!.getHours() + 12
        : period === '오전' && time!.getHours() === 12
          ? 0
          : time!.getHours();

    const combinedDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours24,
      time.getMinutes(),
      0
    );

    if (combinedDateTime < now) {
      setPastTimeModal(true);
      return;
    }

    const noticeLoad: NoticeLoad = {
      hourlyPay: Number(wage),
      startsAt: combinedDateTime.toISOString(),
      workhour,
      description,
    };

    try {
      const response = await axiosInstance.post(`/shops/${user.shop.item.id}/notices`, noticeLoad);
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
    <Wrapper>
      <Container isPage>
        <p className='mb-4 text-heading-l font-bold'>공고 등록</p>
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
                setDate(selectedDate instanceof Date ? selectedDate : new Date(selectedDate));
              }}
            />
            <TimeInput
              label='시작 시간'
              requiredMark
              value={time ? { date: time, period: time.getHours() >= 12 ? '오후' : '오전' } : null}
              onChange={(value: TimeValue | null) => {
                if (value && value.date < new Date()) {
                  setPastTimeModal(true);
                  setTime(null);
                  return;
                }
                setTime(value?.date ?? null);
              }}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='description'
              className={cn('text-base text-black', 'leading-[var(--lh-body-l)]')}
            >
              공고 설명 <span className='text-red-500'>*</span>
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
            disabled={!wage || !date || !time || !workhour || !description || pastTimeModal}
          >
            등록하기
          </Button>
        </form>

        {pastTimeModal && (
          <Modal
            open={pastTimeModal}
            title='과거 시간은 선택할 수 없습니다'
            variant='warning'
            primaryText='확인'
            onPrimary={() => setPastTimeModal(false)}
            onClose={() => setPastTimeModal(false)}
          />
        )}

        {accessModal && (
          <Modal
            open={accessModal}
            title='접근 권한이 없습니다'
            variant='warning'
            primaryText='확인'
            onPrimary={() => router.replace('/')}
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
      </Container>
    </Wrapper>
  );
};

export default EmployerNoticeRegisterPage;
