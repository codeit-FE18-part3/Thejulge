import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import Frame from '@/components/layout/frame/frame';
import Button from '@/components/ui/button/button';
import Table from '@/components/ui/table/Table';
import type { TableRowProps } from '@/components/ui/table/TableRowProps';
import { ADDRESS_CODE, type AddressCode } from '@/constants/dropdown';
import { ICONS, ICON_SIZES } from '@/constants/icon';
import useAuth from '@/hooks/useAuth';
import type { UserType } from '@/types/user'; // 'employee' | 'employer'

/** 임시 프로필 타입 — API 붙이면 서버 타입으로 교체 */
type Profile = {
  name: string;
  phone: string;
  region: AddressCode | '';
  bio?: string;
};

/** ADDRESS_CODE는 문자열 배열 → 포함되면 그대로 표기 */
function renderAddress(code?: AddressCode | ''): string {
  return code && (ADDRESS_CODE as readonly AddressCode[]).includes(code) ? code : '—';
}

export default function MyProfileDetailPage() {
  const { isLogin, user } = useAuth();

  // 임시 저장 기준 — 추후 API로 교체 가능
  const [profile, setProfile] = useState<Profile>({ name: '', phone: '', region: '' });
  const [applications, setApplications] = useState<TableRowProps[]>([]);
  const [isLoadingApps, setIsLoadingApps] = useState<boolean>(true);

  const profileKey = useMemo(() => `thejulge_profile_${user?.id ?? 'guest'}`, [user?.id]);
  const appsKey = useMemo(() => `thejulge_apps_${user?.id ?? 'guest'}`, [user?.id]);

  useEffect(() => {
    if (!isLogin) return;
    try {
      const txt = localStorage.getItem(profileKey);
      if (txt) setProfile(JSON.parse(txt) as Profile);
    } catch {
      /* ignore */
    }
  }, [isLogin, profileKey]);

  useEffect(() => {
    if (!isLogin) return;
    setIsLoadingApps(true);
    try {
      const txt = localStorage.getItem(appsKey);
      const parsed = txt ? (JSON.parse(txt) as TableRowProps[]) : [];
      setApplications(parsed);
    } catch {
      setApplications([]);
    } finally {
      setIsLoadingApps(false);
    }
  }, [isLogin, appsKey]);

  const headers: string[] = ['가게명', '근무일시', '시급', '상태'];
  const userType: UserType = 'employee';

  return (
    <main className='mx-auto w-full max-w-[1440px] px-4 py-6 tablet:py-8'>
      {/* ✅ 데스크톱에서 고정폭 컨테이너(957px) 안에 제목 + 카드 모두 배치해서 안정화 */}
      <div className='mx-auto w-full desktop:max-w-[957px]'>
        <h1 className='mb-6 text-heading-l font-semibold'>내 프로필</h1>

        {/* 프로필 카드 — 배경: --red-100, 보더: --red-300, 라운드 24px */}
        <section
          className='w-full rounded-[24px] border border-[var(--red-300)] bg-[var(--red-100)] p-5 tablet:p-7 desktop:p-8'
          aria-label='내 프로필 요약'
        >
          <div className='flex items-start justify-between gap-4'>
            {/* 왼쪽 정보 */}
            <div className='flex-1'>
              <p className='mb-1 text-body-m font-semibold text-[var(--red-500)]'>이름</p>
              <p className='text-heading-m font-extrabold leading-tight text-[var(--gray-900)]'>
                {profile.name || '—'}
              </p>

              {/* 연락처 */}
              <div className='mt-4 flex items-center gap-2 text-[var(--gray-600)]'>
                <Image
                  src={ICONS.phone}
                  alt='전화'
                  width={24}
                  height={24}
                  className={ICON_SIZES.md}
                  priority
                />
                <span className='text-body-m'>{profile.phone || '—'}</span>
              </div>

              {/* 선호 지역 */}
              <div className='mt-3 flex items-center gap-2 text-[var(--gray-600)]'>
                <Image
                  src={ICONS.map}
                  alt='지도'
                  width={24}
                  height={24}
                  className={ICON_SIZES.md}
                  priority
                />
                <span className='text-body-m'>선호 지역: {renderAddress(profile.region)}</span>
              </div>

              {/* 소개 — 선호지역과 24px 간격 */}
              {profile.bio && (
                <p className='mt-6 whitespace-pre-wrap text-body-m text-[var(--gray-900)]'>
                  {profile.bio}
                </p>
              )}
            </div>

            {/* 우상단 편집 버튼 — 169×48 */}
            <div className='ml-4 shrink-0'>
              <Button
                variant='secondary'
                size='lgFixed' /* h-12 = 48px */
                className='w-[169px]' /* 정확히 169px */
                as={Link}
                href='/my-profile/register'
              >
                편집하기
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* 신청 내역 — 0건이면 Frame, ≥1건이면 타이틀 + Table / 데스크톱 964px 중앙 */}
      <section className='mt-8'>
        {isLoadingApps ? (
          <div className='text-body-m text-[var(--gray-500)]'>불러오는 중…</div>
        ) : applications.length === 0 ? (
          <div className='mx-auto w-full desktop:max-w-[964px]'>
            <Frame
              title='신청 내역'
              content='마음에 드는 공고를 찾아 지원해 보세요.'
              buttonText='공고 보러가기'
              href='/notices'
            />
          </div>
        ) : (
          <div className='mx-auto w-full desktop:max-w-[964px]'>
            <h2 className='mb-4 text-heading-s font-semibold'>신청 내역</h2>
            <Table headers={headers} data={applications} userType={userType} />
          </div>
        )}
      </section>
    </main>
  );
}
