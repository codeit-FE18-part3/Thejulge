import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import Frame from '@/components/layout/frame/frame';
import Button from '@/components/ui/button/button';
import Table from '@/components/ui/table/Table';
import type { TableRowProps } from '@/components/ui/table/TableRowProps';
import { ICONS, ICON_SIZES } from '@/constants/icon';
import useAuth from '@/hooks/useAuth';
import type { UserType } from '@/types/user'; // 'employee' | 'employer'

export default function MyProfileDetailPage() {
  const { isLogin, user } = useAuth();

  // 임시: 신청 내역은 아직 서버 API가 없다면 로컬 모의 데이터 사용
  const [applications, setApplications] = useState<TableRowProps[]>([]);
  const [isLoadingApps, setIsLoadingApps] = useState<boolean>(true);

  // 페이지네이션 상태(팀 Table 시그니처 맞춤)
  const [offset, setOffset] = useState(0);
  const limit = 10;

  // (모의) 저장 키 - 나중에 서버 API로 교체 가능
  const appsKey = useMemo(() => `thejulge_apps_${user?.id ?? 'guest'}`, [user?.id]);

  // 신청 내역 로드(모의)
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

  // 프로필 비었는지 판단 (user 기준)
  const name = user?.name ?? '';
  const phone = user?.phone ?? '';
  // 서버 필드명이 address라고 가정
  const address = (user?.address as string) ?? '';
  const bio = user?.bio ?? '';

  const isProfileEmpty = !name && !phone && !address && !(bio && bio.trim());

  // 프로필 비었는지 판단 (user 기준)
  const name = user?.name ?? '';
  const phone = user?.phone ?? '';
  // 서버 필드명이 address라고 가정
  const address = (user?.address as string) ?? '';
  const bio = user?.bio ?? '';

  const isProfileEmpty = !name && !phone && !address && !(bio && bio.trim());

  const headers: string[] = ['가게명', '근무일시', '시급', '상태'];
  const userType: UserType = 'employee';

  return (
    <main className='mx-auto w-full max-w-[1440px] px-4 py-6 tablet:py-8'>
      <div className='mx-auto w-full desktop:max-w-[957px]'>
        <h1 className='mb-6 text-heading-l font-semibold'>내 프로필</h1>

        {/* 프로필이 없으면 등록 프레임 */}
        {isProfileEmpty ? (
          <Frame
            title='내 프로필'
            content='내 프로필을 등록하고 원하는 가게에 지원해 보세요.'
            buttonText='내 프로필 등록하기'
            href='/my-profile/register'
          />
        ) : (
          // 프로필 카드(피그마 스타일)
          <section
            className='w-full rounded-[24px] border border-[var(--red-300)] bg-[var(--red-100)] p-5 tablet:p-7 desktop:p-8'
            aria-label='내 프로필 요약'
          >
            <div className='flex items-start justify-between gap-4'>
              <div className='flex-1'>
                <p className='mb-1 text-body-m font-semibold text-[var(--red-500)]'>이름</p>
                <p className='text-heading-m font-extrabold leading-tight text-[var(--gray-900)]'>
                  {name || '—'}
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
                  <span className='text-body-m'>{phone || '—'}</span>
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
                  <span className='text-body-m'>선호 지역: {address || '—'}</span>
                </div>

                {/* 소개 */}
                {bio && (
                  <p className='mt-6 whitespace-pre-wrap text-body-m text-[var(--gray-900)]'>
                    {bio}
                  </p>
                )}
              </div>

              {/* 우상단 편집 버튼 */}
              <div className='ml-4 shrink-0'>
                <Button
                  variant='secondary'
                  size='lgFixed'
                  className='w-[169px]'
                  as={Link}
                  href='/my-profile/register'
                >
                  편집하기
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* 신청 내역 — 프로필 있을 때만 노출 */}
      {!isProfileEmpty && (
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
              {/* 팀 Table이 요구하는 pagination props 전달 */}
              <Table
                headers={headers}
                data={paged}
                userType={userType}
                total={applications.length}
                limit={limit}
                offset={offset}
                onPageChange={setOffset} // 팀 Table이 pageIndex를 요구하면 (p)=>setOffset(p*limit) 로 바꾸세요.
              />
            </div>
          )}
        </section>
      )}
    </main>
  );
}
