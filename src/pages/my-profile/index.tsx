import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import Frame from '@/components/layout/frame/frame';
import Button from '@/components/ui/button/button';
import Table from '@/components/ui/table/Table';
import type { TableRowProps } from '@/components/ui/table/TableRowProps';
import { ICONS, ICON_SIZES } from '@/constants/icon';
import { useUserApplications } from '@/context/userApplicationsProvider';
import useAuth from '@/hooks/useAuth';
import type { ApiResponse } from '@/types/api';
import type { ApplicationItem } from '@/types/applications';
import type { User, UserType } from '@/types/user';

export default function MyProfileDetailPage() {
  const { isLogin, user } = useAuth();
  const { applications, isLoading } = useUserApplications();

  // 테이블 페이지네이션
  const [offset, setOffset] = useState(0);
  const limit = 10;

  // 프로필 비었는지 판단 (User | null 안전)
  function isProfileEmpty(u: User | null): boolean {
    const name = u?.name?.trim() ?? '';
    const phone = u?.phone?.trim() ?? '';
    const address = (u?.address as string | undefined)?.trim() ?? '';
    const bio = u?.bio?.trim() ?? '';
    return !name && !phone && !address && !bio;
  }
  const profileIsEmpty = useMemo(() => isProfileEmpty(user), [user]);

  const headers: string[] = ['가게명', '근무일시', '시급', '상태'];
  const userType: UserType = 'employee';

  // 서버 응답 → TableRowProps 매핑
  const rows: TableRowProps[] = useMemo(() => {
    return applications.map((app: ApiResponse<ApplicationItem>) => {
      const a = app.item;
      const status =
        a.status === 'accepted' ? 'approved' : a.status === 'rejected' ? 'rejected' : 'pending';
      return {
        id: a.id,
        name: a.shop.item.name,
        hourlyPay: `${a.notice.item.hourlyPay.toLocaleString()}원`,
        startsAt: a.notice.item.startsAt,
        workhour: a.notice.item.workhour,
        status,
        // employee 표에서는 미사용 — 타입만 충족
        bio: '',
        phone: '',
      };
    });
  }, [applications]);

  const pagedRows = useMemo(() => rows.slice(offset, offset + limit), [rows, offset]);

  return (
    <main className='mx-auto w-full max-w-[1440px] px-4 py-6 tablet:py-8'>
      <div className='mx-auto w-full desktop:max-w-[957px]'>
        <h1 className='mb-6 text-heading-l font-semibold'>내 프로필</h1>

        {/* 프로필이 없으면 등록 프레임 */}
        {profileIsEmpty ? (
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
                  {user?.name || '—'}
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
                  <span className='text-body-m'>{user?.phone || '—'}</span>
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
                  <span className='text-body-m'>선호 지역: {(user?.address as string) || '—'}</span>
                </div>

                {/* 소개 */}
                {user?.bio && (
                  <p className='mt-6 whitespace-pre-wrap text-body-m text-[var(--gray-900)]'>
                    {user.bio}
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

      {/* 신청 내역 — 프로필 있고 로그인 상태일 때만 */}
      {!profileIsEmpty && isLogin && (
        <section className='mt-8'>
          {isLoading ? (
            <div className='text-body-m text-[var(--gray-500)]'>불러오는 중…</div>
          ) : rows.length === 0 ? (
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
              <Table
                headers={headers}
                data={pagedRows}
                userType={userType}
                total={rows.length}
                limit={limit}
                offset={offset}
                onPageChange={setOffset}
              />
            </div>
          )}
        </section>
      )}
    </main>
  );
}
