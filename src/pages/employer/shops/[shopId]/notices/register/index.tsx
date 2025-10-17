import { Button, DateInput, Input, TimeInput } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface NoticePayload {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}

const EmployerNoticeRegisterPage = () => {
  const router = useRouter();
  const { query } = router;
  const shopId = Array.isArray(query.shopId) ? query.shopId[0] : query.shopId;
  const { user } = useAuth();

  const [wage, setWage] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [workhour, setWorkhour] = useState<number>();
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date || !time || !wage || !workhour || !description) return;

    const combinedDateTime = new Date(date);
    combinedDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);

    const payload: NoticePayload = {
      hourlyPay: Number(wage),
      startsAt: combinedDateTime.toISOString(),
      workhour,
      description,
    };

    const token = localStorage.getItem('thejulge_token');
    if (!token) return alert('로그인이 필요합니다');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shops/${shopId}/notices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message ?? '등록 실패');
      }

      alert('등록 완료');
      router.push(`/my-shop`);
    } catch (error) {
      alert(error instanceof Error ? error.message : '등록 중 오류 발생');
    }
  };

  if (!user?.shop) return null;

  return (
    <div className='p-4'>
      <h1 className='mb-4 text-lg font-semibold'>공고 등록하기</h1>

      <form onSubmit={handleSubmit} className='flex max-w-md flex-col gap-4'>
        <Input
          id='wage'
          label='시급'
          requiredMark
          placeholder='입력'
          inputMode='numeric'
          suffix='원'
          value={wage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWage(e.currentTarget.value.replace(/\D+/g, ''))
          }
        />

        <DateInput
          label='시작 일시'
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

        <Input
          id='workhour'
          label='근무 시간(시간)'
          requiredMark
          placeholder='4'
          inputMode='numeric'
          suffix='시간'
          value={workhour?.toString() ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWorkhour(Number(e.currentTarget.value))
          }
        />

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
          size='md'
          className='w-full'
          disabled={!wage || !date || !time || !workhour || !description}
        >
          등록하기
        </Button>
      </form>
    </div>
  );
};

export default EmployerNoticeRegisterPage;
