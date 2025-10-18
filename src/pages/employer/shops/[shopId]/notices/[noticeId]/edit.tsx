import { Button, DateInput, Input, Modal, TimeInput } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import axiosInstance from '@/lib/axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface NoticePayload {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}

const EmployerNoticeEditPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { noticeId } = router.query;

  const [wage, setWage] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [workhour, setWorkhour] = useState<number>();
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (!user.shop) {
      alert('접근 권한이 없습니다.');
      router.replace('/');
      return;
    }

    const fetchNotice = async () => {
      try {
        const response = await axiosInstance.get(
          `/shops/${user.shop?.item.id}/notices/${noticeId}`
        );
        const notice = response.data.item;

        setWage(notice.hourlyPay.toString());
        setWorkhour(notice.workhour);
        setDescription(notice.description);

        const startDate = new Date(notice.startsAt);
        setDate(startDate);
        setTime(startDate);
      } catch {
        alert('공고 정보를 불러오는 중 오류가 발생했습니다.');
        router.back();
      } finally {
        setLoading(false);
      }
    };

    if (noticeId) fetchNotice();
  }, [noticeId, user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date || !time || !wage || !workhour || !description) return;
    if (!user?.shop || !noticeId) return;

    const combinedDateTime = new Date(date);
    combinedDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);

    const payload: NoticePayload = {
      hourlyPay: Number(wage),
      startsAt: combinedDateTime.toISOString(),
      workhour,
      description,
    };

    try {
      await axiosInstance.put(`/shops/${user.shop.item.id}/notices/${noticeId}`, payload);
      setModalOpen(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : '공고 수정 중 오류 발생');
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    if (user?.shop) {
      router.push(`/employer/shops/${user.shop.item.id}/notices/${noticeId}`);
    }
  };

  if (loading) return;
  if (!user?.shop) return null;

  return (
    <div className='p-4'>
      <p className='mb-4 text-3xl font-bold'>공고 편집</p>

      <form onSubmit={handleSubmit} className='flex w-full flex-col gap-4'>
        <div className='grid grid-cols-1 gap-4 tablet:grid-cols-2 tablet:gap-6'>
          <Input
            id='wage'
            label='시급'
            requiredMark
            placeholder='12,500'
            inputMode='numeric'
            suffix='원'
            value={wage}
            onChange={e => setWage(e.currentTarget.value.replace(/\D+/g, ''))}
          />

          <Input
            id='workhour'
            label='업무 시간'
            requiredMark
            placeholder='4'
            inputMode='numeric'
            suffix='시간'
            value={workhour?.toString() ?? ''}
            onChange={e => setWorkhour(Number(e.currentTarget.value))}
          />

          <DateInput
            label='시작 날짜'
            requiredMark
            value={date ?? undefined}
            onChange={selectedDate =>
              setDate(selectedDate instanceof Date ? selectedDate : new Date(selectedDate))
            }
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

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        title='편집 완료'
        variant='success'
        primaryText='확인'
        onPrimary={handleModalClose}
      />
    </div>
  );
};

export default EmployerNoticeEditPage;
