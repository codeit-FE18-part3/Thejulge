import { DateInput, Input, TimeInput } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';

const EmployerNoticeRegisterPage = () => {
  const router = useRouter();
  const { query } = router;
  const shopId = Array.isArray(query.shopId) ? query.shopId[0] : query.shopId;
  const { user } = useAuth();

  const [wage, setWage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      shopId,
      wage: Number(wage),
    };

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('등록 실패');

      alert('등록 완료');
      router.push(`/employer/shops/${shopId}`);
    } catch {
      alert('등록 중 오류 발생');
    }
  };

  if (!user?.shop) return null;

  return (
    <div className='p-4'>
      <h1 className='mb-4 text-lg font-semibold'>공고 등록하기</h1>

      <form onSubmit={handleSubmit} className='flex max-w-md flex-col gap-4'>
        <Input
          id='wage'
          label='시급*'
          requiredMark
          placeholder='입력'
          inputMode='numeric'
          suffix='원'
          value={wage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWage(e.currentTarget.value.replace(/\D+/g, ''))
          }
        />

        <DateInput />
        <TimeInput />

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
          />
        </div>

        <button
          type='submit'
          className='rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600'
        >
          등록하기
        </button>
      </form>
    </div>
  );
};

export default EmployerNoticeRegisterPage;
