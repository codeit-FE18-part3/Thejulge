// src/pages/my-profile/index.tsx
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { Container } from '@/components/layout'; // ✅ my-shop과 동일 패턴
import Frame from '@/components/layout/frame/frame';
import Button from '@/components/ui/button/button';
import Table from '@/components/ui/table/Table';

import { ICONS, ICON_SIZES } from '@/constants/icon';
import { useUserApplications } from '@/context/userApplicationsProvider';
import useAuth from '@/hooks/useAuth';

import type { TableRowProps } from '@/components/ui/table/TableRowProps';
import type { ApiResponse } from '@/types/api';
import type { ApplicationItem } from '@/types/applications';
import type { User, UserType } from '@/types/user';

export default function MyProfileDetailPage() {
  const { isLogin, user } = useAuth();
  const { applications, isLoading } = useUserApplications();

  // 테이블 페이지네이션
  const [offset, setOffset] = useState(0);
  const limit = 5;

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

  // 서버 응답 → TableRowProps 매핑 (shopId/noticeId 포함)
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
        bio: '',
        phone: '',
        // ✅ TableRow가 요구하는 키 채움
        shopId: a.shop.item.id,
        noticeId: a.notice.item.id,
      };
    });
  }, [applications]);

  // 로딩 중에도 마지막 성공 데이터를 유지 (화면 흔들림 방지)
  const [stableRows, setStableRows] = useState<TableRowProps[]>([]);
  const [stableTotal, setStableTotal] = useState<number>(0);
  useEffect(() => {
    if (rows.length > 0) {
      setStableRows(rows);
      setStableTotal(applications.length);
    }
  }, [rows, applications.length]);

  // rows 변화 시 첫 페이지로 리셋
  useEffect(() => {
    setOffset(0);
  }, [rows.length]);

  const currentRows = rows.length > 0 ? rows : stableRows;
  const currentTotal = rows.length > 0 ? applications.length : stableTotal;

  const pagedRows = useMemo(() => currentRows.slice(offset, offset + limit), [currentRows, offset]);
  const displayOffset = currentTotal > limit ? (offset === 0 ? 2 : offset) : offset;
  return (
    <>
      {/* ───────────────── 상단 영역 ───────────────── */}
      {profileIsEmpty ? (
        // ✅ 2중 컨테이너 제거: Frame만 단독 렌더
        <Frame
          title='내 프로필'
          content='내 프로필을 등록하고 원하는 가게에 지원해 보세요.'
          buttonText='내 프로필 등록하기'
          href='/my-profile/register'
        />
      ) : (
        // ✅ 공용 Container로 감싸서 my-shop과 동일한 레이아웃 패턴
        <Container as='section' isPage>
          <div className='desktop:flex desktop:items-start desktop:gap-8'>
            <h1 className='mb-6 text-heading-l font-semibold desktop:mb-0 desktop:w-[200px] desktop:shrink-0 desktop:pt-2'>
              내 프로필
            </h1>

            <section
              className='flex-1 rounded-[24px] bg-[var(--red-100)] p-4 tablet:p-6 desktop:max-w-[780px] desktop:p-7'
              aria-label='내 프로필 요약'
            >
              <div className='flex items-start justify-between gap-3 tablet:gap-4 desktop:gap-6'>
                <div className='flex-1'>
                  <p className='mb-1 text-body-m font-semibold text-[var(--red-500)]'>이름</p>
                  <p className='text-heading-m font-extrabold leading-tight text-[var(--gray-900)]'>
                    {user?.name || '—'}
                  </p>

                  {/* 연락처 */}
                  <div className='mt-3 flex items-center gap-2 text-[var(--gray-600)] tablet:mt-4'>
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
                  <div className='mt-2 flex items-center gap-2 text-[var(--gray-600)] tablet:mt-3'>
                    <Image
                      src={ICONS.map}
                      alt='지도'
                      width={24}
                      height={24}
                      className={ICON_SIZES.md}
                      priority
                    />
                    <span className='text-body-m'>
                      선호 지역: {(user?.address as string) || '—'}
                    </span>
                  </div>

                  {/* 소개 */}
                  {user?.bio && (
                    <p className='mt-5 whitespace-pre-wrap text-body-m text-[var(--gray-900)] tablet:mt-6'>
                      {user.bio}
                    </p>
                  )}
                </div>

                {/* 우상단 편집 버튼 */}
                <div className='ml-3 shrink-0 tablet:ml-4'>
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
          </div>
        </Container>
      )}

      {/* ──────────────── 하단: 신청 내역 ──────────────── */}
      {!profileIsEmpty && isLogin && (
        <section className='mt-8 bg-[var(--gray-50)] pb-8 pt-0 tablet:pt-8'>
          {isLoading && currentRows.length === 0 ? (
            <Container as='section' isPage className='pt-0'>
              <div className='px-0 text-xl font-bold'>
                <h2 className='text-heading-l font-semibold'>신청 내역</h2>
              </div>
              <div className='m-7 overflow-hidden rounded-lg border bg-white lg:mx-auto lg:max-w-[1000px]'>
                <div className='h-[48px] bg-[var(--red-100)]' />
                {[...Array(5)].map((_, i) => (
                  <div key={i} className='h-[56px] border-t bg-white last:border-b' />
                ))}
                <div className='flex justify-center px-3 py-2' />
              </div>
            </Container>
          ) : currentRows.length === 0 ? (
            // ✅ 2중 컨테이너 제거: Frame만 단독 렌더
            <Frame
              title='신청 내역'
              content='마음에 드는 공고를 찾아 지원해 보세요.'
              buttonText='공고 보러가기'
              href='/notices'
            />
          ) : (
            <Container as='section' isPage className='pt-0'>
              <Table
                headers={headers}
                tableData={pagedRows}
                userRole={userType}
                total={currentTotal}
                limit={limit}
                offset={displayOffset}
                onPageChange={setOffset}
                onStatusUpdate={() => {}} // ✅ 이 페이지에서는 상태 변경 없음(필수 prop 무해한 no-op)
              />
            </Container>
          )}
        </section>
      )}
    </>
  );
}
