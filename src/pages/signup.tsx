import logo from '@/assets/images/logo.svg';
import { Icon } from '@/components/ui';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/input/input';
import Modal from '@/components/ui/modal/modal';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import type { NextPageWithLayout } from './_app';

type MemberType = 'employee' | 'employer';

const getMsg = (err: unknown, fallback: string) => {
  if (typeof err === 'string') return err;
  if (err && typeof err === 'object') {
    const e = err as {
      response?: { status?: number; data?: { message?: string } };
      message?: string;
    };
    return e.response?.data?.message ?? e.message ?? fallback;
  }
  return fallback;
};

const SignupPage: NextPageWithLayout = () => {
  const { signup } = useAuth();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [type, setType] = useState<MemberType>('employee');

  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [pwErr, setPwErr] = useState<string | null>(null);
  const [pw2Err, setPw2Err] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [dupOpen, setDupOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [globalErr, setGlobalErr] = useState<string | null>(null);

  const onBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.typeMismatch) setEmailErr('이메일 형식으로 작성해 주세요.');
    else setEmailErr(null);
  };
  const onBlurPw = () => setPwErr(pw.length < 8 ? '8자 이상 입력해주세요.' : null);
  const onBlurPw2 = () => setPw2Err(pw !== pw2 ? '비밀번호가 일치하지 않습니다.' : null);

  const canSubmit =
    !!email && pw.length >= 8 && !!pw2 && pw === pw2 && !emailErr && !pwErr && !pw2Err && !loading;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalErr(null);

    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }
    if (!canSubmit) {
      onBlurEmail({
        currentTarget: e.currentTarget.email,
      } as unknown as React.FocusEvent<HTMLInputElement>);
      onBlurPw();
      onBlurPw2();
      return;
    }

    setLoading(true);
    try {
      await signup({ email, password: pw, type });
      setSuccessOpen(true); // ✅ alert → 모달
    } catch (err) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 409) setDupOpen(true);
      else setGlobalErr(getMsg(err, '회원가입 중 오류가 발생했습니다.'));
    } finally {
      setLoading(false);
    }
  };

  function TypePill({
    value,
    label,
    className,
  }: {
    value: MemberType;
    label: string;
    className?: string;
  }) {
    const checked = type === value;
    return (
      <button
        type='button'
        onClick={() => setType(value)}
        aria-pressed={checked}
        className={cn(
          'flex h-11 w-full items-center justify-center gap-2 rounded-full border px-5 transition',
          checked
            ? 'border-[var(--red-500)] bg-[var(--red-100)] text-[var(--red-600)]'
            : 'border-[var(--gray-300)] bg-white text-[var(--black)]',
          'desktop:h-[44px] desktop:gap-[8px] desktop:rounded-[24px] desktop:px-[20px]',
          className
        )}
      >
        <span className='relative inline-flex h-5 w-5 items-center justify-center desktop:h-[18px] desktop:w-[18px]'>
          {checked ? (
            <>
              <Icon
                iconName='successCircle'
                iconSize='sm'
                className='bg-[var(--red-500)]'
                decorative
                ariaLabel='selected circle'
              />
              <Icon
                iconName='success'
                iconSize='x-sm'
                className='absolute bg-white'
                decorative
                ariaLabel='check'
              />
            </>
          ) : (
            <span className='box-content block h-3.5 w-3.5 rounded-full border border-[var(--gray-300)] desktop:h-[14px] desktop:w-[14px]' />
          )}
        </span>
        <span className='leading-[var(--lh-body-m)] text-[var(--fs-body-m)]'>{label}</span>
      </button>
    );
  }

  return (
    <main className='mx-auto w-full px-4 py-10 desktop:py-0'>
      <section
        className={cn(
          'mx-auto w-full rounded-xl bg-white p-6 shadow',
          'max-w-[400px] tablet:max-w-[480px]',
          'desktop:max-w-none desktop:bg-transparent desktop:shadow-none',
          'desktop:flex desktop:min-h-[1024px] desktop:flex-col desktop:items-center'
        )}
      >
        {/* 로고 */}
        <div className='mb-6 flex justify-center desktop:mb-0' style={{ marginTop: 156 }}>
          <h1 className='desktop:w-[256px]] relative h-[36px] w-[120px] tablet:h-[40px] tablet:w-[140px] min-[1024px]:h-[90px] min-[1024px]:w-[256px] desktop:h-[90px]'>
            <Link href='/' aria-label='홈으로 이동' className='absolute inset-0 block'>
              <Image
                src={logo}
                alt='더 줄게 로고'
                fill
                priority
                className='object-contain'
                sizes='(max-width: 744px) 120px, (max-width: 1028px) 140px, 248px'
              />
            </Link>
          </h1>
        </div>

        {/* 폼 */}
        <form
          onSubmit={onSubmit}
          noValidate
          className={cn(
            'mx-auto flex w-full flex-col gap-4',
            'max-w-[400px] tablet:max-w-[480px]',
            'desktop:mt-[30px] desktop:w-[350px] desktop:max-w-none desktop:gap-[28px]'
          )}
        >
          {/* 이메일 */}
          <div className='flex flex-col gap-2 desktop:h-[92px] desktop:gap-[8px]'>
            <Input
              id='email'
              name='email'
              autoComplete='email'
              label='이메일'
              type='email'
              placeholder='입력'
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (emailErr) setEmailErr(null);
              }}
              onBlur={onBlurEmail}
              required
              error={emailErr ?? undefined}
              className='desktop:h-[48px]'
            />
          </div>

          {/* 비밀번호 */}
          <div className='flex flex-col gap-2 desktop:h-[92px] desktop:gap-[8px]'>
            <Input
              id='password'
              name='new-password'
              autoComplete='new-password'
              label='비밀번호'
              type='password'
              placeholder='입력'
              value={pw}
              onChange={e => {
                setPw(e.target.value);
                if (pwErr) setPwErr(null);
              }}
              onBlur={onBlurPw}
              minLength={8}
              required
              error={pwErr ?? undefined}
              className='desktop:h-[48px]'
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className='flex flex-col gap-2 desktop:h-[92px] desktop:gap-[8px]'>
            <Input
              id='password2'
              name='new-password-confirm'
              autoComplete='new-password'
              label='비밀번호 확인'
              type='password'
              placeholder='입력'
              value={pw2}
              onChange={e => {
                setPw2(e.target.value);
                if (pw2Err) setPw2Err(null);
              }}
              onBlur={onBlurPw2}
              required
              error={pw2Err ?? undefined}
              className='desktop:h-[48px]'
            />
          </div>

          {/* 회원 유형 */}
          <div className='flex flex-col gap-2 desktop:h-[79px] desktop:gap-[8px]'>
            <div className='leading-[var(--lh-body-m)] text-[var(--fs-body-m)]'>회원 유형</div>
            <div className={cn('grid w-full grid-cols-2 gap-3', 'desktop:w-[350px]')}>
              <TypePill value='employee' label='알바님' />
              <TypePill value='employer' label='사장님' />
            </div>
          </div>

          {globalErr && (
            <p className='leading-[var(--lh-body-s)] text-[var(--fs-body-s)] text-[var(--red-500)]'>
              {globalErr}
            </p>
          )}

          {/* 가입하기 */}
          <div className='flex justify-center'>
            <Button
              type='submit'
              variant='primary'
              size='lgFixed'
              full
              disabled={!canSubmit}
              aria-busy={loading}
              className={cn(
                'desktop:h-[48px] desktop:w-[350px] desktop:rounded-[6px]',
                'desktop:px-[136px] desktop:py-[14px]'
              )}
            >
              가입하기
            </Button>
          </div>

          <p className='text-center leading-[var(--lh-body-s)] text-[var(--fs-body-s)]'>
            이미 가입하셨나요?{' '}
            <Link href='/login' className='text-[var(--blue-200)] underline'>
              로그인하기
            </Link>
          </p>
        </form>
      </section>

      {/* 409 중복 이메일 모달 */}
      <Modal
        open={dupOpen}
        onClose={() => setDupOpen(false)}
        title='이미 사용중인 이메일입니다'
        description={<p className='text-center'>다른 이메일로 가입을 진행해주세요.</p>}
        variant='warning'
        primaryText='확인'
        onPrimary={() => setDupOpen(false)}
      />

      {/* 가입 성공 모달 */}
      <Modal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title='가입이 완료되었습니다'
        description={<p className='text-center'>이메일과 비밀번호로 로그인해 주세요.</p>}
        variant='success'
        primaryText='로그인하기'
        onPrimary={() => {
          setSuccessOpen(false);
          window.location.href = '/login';
        }}
      />
    </main>
  );
};

// Header/Footer 제거용 전용 레이아웃
SignupPage.getLayout = (page: ReactNode) => page;

export default SignupPage;
