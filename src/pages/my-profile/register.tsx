// src/pages/my-profile/register.tsx
import Button from '@/components/ui/button/button';
import Dropdown from '@/components/ui/dropdown/dropdown';
import Input from '@/components/ui/input/input';
import { ADDRESS_CODE, type AddressCode } from '@/constants/dropdown';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

type Form = {
  name: string;
  phone: string;
  region?: AddressCode;
  bio?: string;
};

export default function MyProfileRegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState<Form>({ name: '', phone: '' });
  const [nameErr, setNameErr] = useState<string | null>(null);
  const [phoneErr, setPhoneErr] = useState<string | null>(null);
  const [regionErr, setRegionErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onChange = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm(prev => ({ ...prev, [k]: v }));

  const canSubmit =
    !!form.name && !!form.phone && !!form.region && !nameErr && !phoneErr && !regionErr && !loading;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    try {
      // TODO: 실제 POST/PUT API 연결
      alert('프로필이 등록(수정)되었습니다.');
      router.replace('/my-profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='mx-auto w-full max-w-[960px] px-4 py-6 tablet:py-8'>
      {/* ⬇️ Figma 제목(이전 Frame 헤더와 같은 무게감) */}
      <h1 className='mb-6 font-bold leading-[var(--lh-heading-l)] text-[var(--black)] text-[var(--fs-heading-l)]'>
        내 프로필
      </h1>

      <form
        onSubmit={onSubmit}
        noValidate
        className={cn('rounded-xl bg-white p-6 shadow', 'flex flex-col gap-6')}
      >
        {/* 3열 그리드 */}
        <div className='grid grid-cols-1 gap-4 tablet:grid-cols-3'>
          {/* 이름 */}
          <Input
            id='name'
            label='이름'
            placeholder='입력'
            value={form.name}
            onChange={e => {
              onChange('name', e.target.value);
              if (nameErr) setNameErr(null);
            }}
            onBlur={() => setNameErr(form.name.trim() ? null : '이름을 입력해 주세요.')}
            required
            error={nameErr ?? undefined}
          />

          {/* 연락처 */}
          <Input
            id='phone'
            label='연락처'
            placeholder='010-1234-5678'
            value={form.phone}
            onChange={e => {
              onChange('phone', e.target.value);
              if (phoneErr) setPhoneErr(null);
            }}
            onBlur={() =>
              setPhoneErr(
                /^0\d{1,2}-\d{3,4}-\d{4}$/.test(form.phone.trim())
                  ? null
                  : '연락처 형식(010-1234-5678)으로 입력해 주세요.'
              )
            }
            required
            error={phoneErr ?? undefined}
          />

          {/* 선호 지역 - 드롭다운 */}
          <div className='flex flex-col'>
            <label className='mb-2 text-body-m' htmlFor='region'>
              선호 지역*
            </label>
            <Dropdown<AddressCode>
              name='region'
              ariaLabel='선호 지역 선택'
              values={ADDRESS_CODE}
              selected={form.region}
              onChange={val => {
                onChange('region', val);
                if (regionErr) setRegionErr(null);
              }}
              size='md'
              className='w-full'
              placeholder='선택'
            />
            {regionErr && (
              <p className='mt-2 text-[var(--fs-caption)] text-[var(--red-500)]'>{regionErr}</p>
            )}
          </div>
        </div>

        {/* 소개 */}
        <div className='flex flex-col'>
          <label htmlFor='bio' className='mb-2 text-body-m'>
            소개
          </label>
          <textarea
            id='bio'
            className='base-input min-h-[160px] resize-y'
            placeholder='간단한 자기소개를 입력해 주세요.'
            value={form.bio ?? ''}
            onChange={e => onChange('bio', e.target.value)}
          />
        </div>

        {/* ⬇️ Figma: 중앙의 큰 단일 버튼 */}
        <div className='mt-2 flex justify-center'>
          <Button
            type='submit'
            variant='primary'
            size='lgFixed'
            disabled={!canSubmit}
            aria-busy={loading}
            className='w-full tablet:w-[350px]'
          >
            등록하기
          </Button>
        </div>

        {/* 뒤로가기는 링크로만 필요하면! (시안에 버튼 하나라 숨김) */}
        <div className='hidden'>
          <Link href='/my-profile'>목록으로</Link>
        </div>
      </form>
    </main>
  );
}
