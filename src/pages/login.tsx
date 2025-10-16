import logo from '@/assets/images/logo.svg';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/input/input';
import Modal from '@/components/ui/modal/modal';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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

export default function LoginPage() {
  const { login } = useAuth();

  // 입력
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  // blur 에러
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [pwErr, setPwErr] = useState<string | null>(null);

  // 기타 상태
  const [loading, setLoading] = useState(false);
  const [failOpen, setFailOpen] = useState(false);
  const [globalErr, setGlobalErr] = useState<string | null>(null);

  // 요구사항: blur 시 이메일 형식/비번 길이 체크
  const onBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.typeMismatch) setEmailErr('이메일 형식으로 작성해 주세요.');
    else setEmailErr(null);
  };
  const onBlurPw = () => setPwErr(pw.length < 8 ? '8자 이상 입력해주세요.' : null);

  const canSubmit = !!email && pw.length >= 8 && !emailErr && !pwErr && !loading;

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
      return;
    }

    setLoading(true);
    try {
      await login({ email, password: pw });
      // 로그인 성공 → 공고 리스트로 이동
      window.location.href = '/';
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      // 401/400 등은 모달로 안내
      if (status && [400, 401].includes(status)) setFailOpen(true);
      else setGlobalErr(getMsg(err, '로그인 중 오류가 발생했습니다.'));
    } finally {
      setLoading(false);
    }
  };

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
        {/* 로고: 공고 목록으로 이동 */}
        <div className='mb-6 flex justify-center desktop:mb-0' style={{ marginTop: 156 }}>
          <h1 className='relative h-[36px] w-[120px] tablet:h-[40px] tablet:w-[140px] min-[1024px]:h-[90px] min-[1024px]:w-[256px] desktop:h-[90px] desktop:w-[256px]'>
            <Link href='/' aria-label='공고 리스트로 이동' className='absolute inset-0 block'>
              <Image
                src={logo}
                alt='THE JULGE'
                fill
                priority
                className='object-contain'
                sizes='(max-width: 744px) 120px, (max-width: 1028px) 140px, 248px'
              />
            </Link>
          </h1>
        </div>

        {/* 로그인 폼 */}
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
              name='current-password'
              autoComplete='current-password'
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

          {globalErr && (
            <p className='leading-[var(--lh-body-s)] text-[var(--fs-body-s)] text-[var(--red-500)]'>
              {globalErr}
            </p>
          )}

          {/* 로그인 버튼: desktop 350×48, radius 6, py14 px136 */}
          <div className='flex justify-center'>
            <Button
              type='submit'
              variant='primary'
              size='lgFixed'
              full
              disabled={!canSubmit}
              aria-busy={loading}
              className={cn(
                'desktop:h-[48px] desktop:w-[350px] desktop:rounded-[6px] desktop:px-[136px] desktop:py-[14px]'
              )}
            >
              로그인하기
            </Button>
          </div>

          <p className='text-center leading-[var(--lh-body-s)] text-[var(--fs-body-s)]'>
            아직 계정이 없으신가요?{' '}
            <Link href='/signup' className='text-[var(--blue-200)] underline'>
              회원가입
            </Link>
          </p>
        </form>
      </section>

      {/* 로그인 실패 모달 */}
      <Modal
        open={failOpen}
        onClose={() => setFailOpen(false)}
        title='이메일 또는 비밀번호가 올바르지 않습니다'
        description={<p className='text-center'>다시 한 번 확인해 주세요.</p>}
        variant='warning'
        primaryText='확인'
        onPrimary={() => setFailOpen(false)}
      />
    </main>
  );
}
