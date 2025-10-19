import { Icon } from '@/components/ui';
import Button from '@/components/ui/button/button';
import Dropdown from '@/components/ui/dropdown/dropdown';
import Input from '@/components/ui/input/input';
import Modal from '@/components/ui/modal/modal';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ADDRESS_CODE, type AddressCode } from '@/constants/dropdown';

/** 폼 타입 */
type ProfileForm = {
  name: string;
  phone: string;
  region: AddressCode | '';
  bio: string; // bio는 선택
};

export default function MyProfileRegisterPage() {
  const router = useRouter();
  const { isLogin, user, updateUser } = useAuth();

  const [formState, setFormState] = useState<ProfileForm>({
    name: '',
    phone: '',
    region: '',
    bio: '',
  });

  const [nameErrorMessage, setNameErrorMessage] = useState<string | null>(null);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState<string | null>(null);
  const [regionErrorMessage, setRegionErrorMessage] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDoneOpen, setIsDoneOpen] = useState(false); // 완료 모달
  const [isCancelOpen, setIsCancelOpen] = useState(false); // 취소 확인 모달

  // 로그인 가드
  useEffect(() => {
    if (!isLogin) router.replace('/login');
  }, [isLogin, router]);

  // 기존 값 프리필(컨텍스트 user 사용)
  useEffect(() => {
    if (!isLogin || !user) return;
    setFormState({
      name: user.name ?? '',
      phone: user.phone ?? '',
      region: (user.address as AddressCode) ?? '',
      bio: user.bio ?? '',
    });
  }, [isLogin, user]);

  const updateFormField = <K extends keyof ProfileForm>(k: K, v: ProfileForm[K]) =>
    setFormState(prev => ({ ...prev, [k]: v }));

  const isFormSubmittable =
    !!formState.name &&
    !!formState.phone &&
    !!formState.region &&
    !nameErrorMessage &&
    !phoneErrorMessage &&
    !regionErrorMessage &&
    !isSubmitting;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();

    if (!formState.name.trim()) setNameErrorMessage('이름을 입력해 주세요.');
    if (!/^0\d{1,2}-\d{3,4}-\d{4}$/.test(formState.phone.trim()))
      setPhoneErrorMessage('연락처 형식(010-1234-5678)으로 입력해 주세요.');
    if (!formState.region) setRegionErrorMessage('선호 지역을 선택해 주세요.');

    if (!isFormSubmittable || !user) return;

    setIsSubmitting(true);
    try {
      // 서버 반영 + 컨텍스트 동기화
      await updateUser({
        name: formState.name.trim(),
        phone: formState.phone.trim(),
        address: formState.region,
        bio: formState.bio, // bio는 선택(빈 문자열 가능)
      });
      setIsDoneOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='relative mx-auto w-full max-w-[960px] px-4 py-6 tablet:py-8'>
      {/* 우상단 닫기(X) 버튼 */}
      <button
        type='button'
        aria-label='프로필 등록 취소'
        className='absolute right-4 top-6 rounded p-2 hover:bg-[var(--gray-100)]'
        onClick={() => setIsCancelOpen(true)}
      >
        <Icon iconName='close' iconSize='md' ariaLabel='닫기' />
      </button>

      <h1 className='mb-6 text-heading-l font-semibold'>내 프로필</h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className='rounded-xl bg-white p-6 shadow'
        aria-label='내 프로필 등록/수정 폼'
      >
        <div className='grid grid-cols-1 gap-4 tablet:grid-cols-3'>
          {/* 이름 */}
          <div className='flex flex-col'>
            <Input
              id='name'
              label='이름*' // ⭐ 변경: 필수표시
              placeholder='입력'
              value={formState.name}
              onChange={e => {
                updateFormField('name', e.target.value);
                if (nameErrorMessage) setNameErrorMessage(null);
              }}
              onBlur={() =>
                setNameErrorMessage(formState.name.trim() ? null : '이름을 입력해 주세요.')
              }
              required // HTML5 required
              error={nameErrorMessage ?? undefined}
            />
            {nameErrorMessage && (
              <p className='mt-1 text-caption text-[var(--red-500)]' role='alert'>
                {nameErrorMessage}
              </p>
            )}
          </div>

          {/* 연락처 */}
          <div className='flex flex-col'>
            <Input
              id='phone'
              label='연락처*' // ⭐ 변경: 필수표시
              placeholder='010-1234-5678'
              value={formState.phone}
              onChange={e => {
                updateFormField('phone', e.target.value);
                if (phoneErrorMessage) setPhoneErrorMessage(null);
              }}
              onBlur={() =>
                setPhoneErrorMessage(
                  /^0\d{1,2}-\d{3,4}-\d{4}$/.test(formState.phone.trim())
                    ? null
                    : '연락처 형식(010-1234-5678)으로 입력해 주세요.'
                )
              }
              required
              error={phoneErrorMessage ?? undefined}
            />
            {phoneErrorMessage && (
              <p className='mt-1 text-caption text-[var(--red-500)]' role='alert'>
                {phoneErrorMessage}
              </p>
            )}
          </div>

          {/* 선호 지역 */}
          <div className='flex flex-col'>
            <label htmlFor='region' className='mb-2 text-body-m'>
              선호 지역*
            </label>
            <Dropdown<AddressCode>
              name='region'
              ariaLabel='선호 지역 선택'
              values={ADDRESS_CODE}
              selected={formState.region || undefined}
              onChange={value => {
                updateFormField('region', value);
                if (regionErrorMessage) setRegionErrorMessage(null);
              }}
              size='md'
              placeholder='선택'
              className='w-full'
            />
            {regionErrorMessage && (
              <p className='mt-1 text-caption text-[var(--red-500)]' role='alert'>
                {regionErrorMessage}
              </p>
            )}
          </div>
        </div>

        {/* 소개(선택) */}
        <div className='mt-4'>
          <label htmlFor='bio' className='mb-2 block text-body-m'>
            소개 (선택) {/* ⭐ 변경: 선택 표기 */}
          </label>
          <textarea
            id='bio'
            className='base-input min-h-[120px] w-full resize-y'
            placeholder='간단한 자기소개를 입력해 주세요.'
            value={formState.bio}
            onChange={e => updateFormField('bio', e.target.value)}
          />
        </div>

        {/* 등록 버튼 */}
        <div className='mt-6 flex justify-center'>
          <Button
            type='submit'
            variant='primary'
            size='lgFixed'
            className='w-full tablet:w-[360px]'
            disabled={!isFormSubmittable}
            aria-busy={isSubmitting}
          >
            등록하기
          </Button>
        </div>
      </form>

      {/* 등록 완료 모달 */}
      <Modal
        open={isDoneOpen}
        onClose={() => setIsDoneOpen(false)}
        title='등록이 완료되었습니다.'
        variant='success'
        primaryText='확인'
        onPrimary={() => {
          setIsDoneOpen(false);
          router.replace('/my-profile');
        }}
      />

      {/* 취소 확인 모달 */}
      <Modal
        open={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        title='등록을 취소하시겠습니까?'
        description={<p className='text-center'>작성 중인 내용은 저장되지 않습니다.</p>}
        variant='warning'
        secondaryText='아니오'
        onSecondary={() => setIsCancelOpen(false)}
        primaryText='예'
        onPrimary={() => router.replace('/my-profile')}
      />
    </main>
  );
}
