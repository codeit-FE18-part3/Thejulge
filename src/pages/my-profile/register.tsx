import Frame from '@/components/layout/frame/frame';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/input/input';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

type Form = {
  name: string;
  phone: string;
  region: string;
  hourlyWage?: number | '';
  bio?: string;
};

export default function MyProfileRegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState<Form>({
    name: '',
    phone: '',
    region: '',
    hourlyWage: '',
    bio: '',
  });

  // blur 에러
  const [nameErr, setNameErr] = useState<string | null>(null);
  const [phoneErr, setPhoneErr] = useState<string | null>(null);
  const [regionErr, setRegionErr] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const canSubmit =
    !!form.name && !!form.phone && !!form.region && !nameErr && !phoneErr && !regionErr && !loading;

  const onChange = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm(p => ({ ...p, [key]: value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    try {
      // TODO: POST/PUT API 연동
      alert('프로필이 등록(수정)되었습니다.');
      router.replace('/my-profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='mx-auto w-full max-w-[960px] px-4 py-6 tablet:py-8'>
      {/* ✅ Frame은 문자열 props만 */}
      <Frame
        title='내 프로필 등록'
        content='기본 정보를 입력해 주세요.'
        buttonText='목록으로'
        href='/my-profile'
      />

      {/* ✅ 실제 폼 UI는 Frame 아래에서 */}
      <form
        onSubmit={onSubmit}
        noValidate
        className={cn(
          'mt-4 rounded-xl bg-white p-6 shadow',
          'flex flex-col gap-4',
          'max-w-[720px]'
        )}
      >
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

        <Input
          id='region'
          label='거주 지역'
          placeholder='예: 서울 강남구'
          value={form.region}
          onChange={e => {
            onChange('region', e.target.value);
            if (regionErr) setRegionErr(null);
          }}
          onBlur={() => setRegionErr(form.region.trim() ? null : '거주 지역을 입력해 주세요.')}
          required
          error={regionErr ?? undefined}
        />

        <Input
          id='hourlyWage'
          label='희망 시급(원)'
          type='number'
          placeholder='예: 12000'
          value={form.hourlyWage ?? ''}
          onChange={e =>
            onChange('hourlyWage', e.target.value === '' ? '' : Number(e.target.value))
          }
          min={0}
        />

        <div className='flex flex-col'>
          <label htmlFor='bio' className='mb-2 text-body-m'>
            소개(선택)
          </label>
          <textarea
            id='bio'
            className='base-input min-h-[96px] resize-y'
            placeholder='간단한 자기소개를 입력해 주세요.'
            value={form.bio ?? ''}
            onChange={e => onChange('bio', e.target.value)}
          />
        </div>

        <div className='mt-2 flex gap-2'>
          <Button
            type='submit'
            variant='primary'
            size='lgFixed'
            disabled={!canSubmit}
            aria-busy={loading}
          >
            등록하기
          </Button>
          <Link href='/my-profile' className='inline-flex'>
            <Button type='button' variant='secondary' size='lgFixed'>
              취소
            </Button>
          </Link>
        </div>
      </form>
    </main>
  );
}
