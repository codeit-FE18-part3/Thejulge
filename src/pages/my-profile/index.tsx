import Frame from '@/components/layout/frame/frame';
import Button from '@/components/ui/button/button';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// (예시) 타입
type MyProfile = {
  id: string;
  name: string;
  phone: string;
  region: string;
  bio?: string;
  hourlyWage?: number;
};

type ApplicationRow = {
  id: string;
  title: string;
  appliedAt: string;
  status: '대기' | '진행' | '거절' | '채용';
};

export default function MyProfileDetailPage() {
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [apps, setApps] = useState<ApplicationRow[]>([]);

  useEffect(() => {
    // TODO: API로 교체
    setProfile({
      id: 'me',
      name: '홍길동',
      phone: '010-1234-5678',
      region: '서울 강남구',
      bio: '주말/야간 가능, 성실합니다.',
      hourlyWage: 12000,
    });
    setApps([
      { id: 'a1', title: '카페 바리스타 주말 알바', appliedAt: '2025-10-10', status: '진행' },
      { id: 'a2', title: '매장 서빙 평일 저녁', appliedAt: '2025-10-09', status: '대기' },
    ]);
  }, []);

  return (
    <main className='mx-auto w-full max-w-[960px] px-4 py-6 tablet:py-8'>
      {/*  Frame은 문자열 props만 사용 */}
      <Frame
        title='내 프로필'
        content={profile ? '등록된 프로필' : '아직 등록된 프로필이 없습니다.'}
        buttonText={profile ? '수정하기' : '등록하기'}
        href='/my-profile/register'
      />

      {/*  실제 상세/테이블은 Frame 아래에서 JSX로 렌더 */}
      <section className='mt-4 rounded-xl bg-white p-6 shadow'>
        {profile ? (
          <>
            <h2 className='mb-3 text-heading-s font-medium'>기본 정보</h2>
            <dl className='grid grid-cols-1 gap-y-3 tablet:grid-cols-2'>
              <div>
                <dt className='text-body-s text-[var(--gray-600)]'>이름</dt>
                <dd className='text-body-l'>{profile.name}</dd>
              </div>
              <div>
                <dt className='text-body-s text-[var(--gray-600)]'>연락처</dt>
                <dd className='text-body-l'>{profile.phone}</dd>
              </div>
              <div>
                <dt className='text-body-s text-[var(--gray-600)]'>지역</dt>
                <dd className='text-body-l'>{profile.region}</dd>
              </div>
              <div>
                <dt className='text-body-s text-[var(--gray-600)]'>희망 시급</dt>
                <dd className='text-body-l'>
                  {profile.hourlyWage ? profile.hourlyWage.toLocaleString() + '원' : '-'}
                </dd>
              </div>
            </dl>
            {profile.bio && (
              <div className='mt-4'>
                <dt className='text-body-s text-[var(--gray-600)]'>소개</dt>
                <dd className='mt-1 whitespace-pre-line text-body-m'>{profile.bio}</dd>
              </div>
            )}
            <div className='mt-6'>
              <Link href='/my-profile/register'>
                <Button size='md' variant='secondary'>
                  수정하기
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className='mb-4 text-body-m text-[var(--gray-600)]'>내 프로필을 등록해 주세요.</p>
            <Link href='/my-profile/register'>
              <Button size='md' variant='primary'>
                내 프로필 등록하기
              </Button>
            </Link>
          </>
        )}
      </section>

      {/* 신청 내역 */}
      <section className='mt-6 rounded-xl bg-white p-6 shadow'>
        <div className='mb-3 flex items-center justify-between'>
          <h2 className='text-heading-s font-medium'>신청 내역</h2>
        </div>

        {/* ⚠ 팀의 table 컴포넌트로 교체 가능 */}
        <div className='overflow-hidden rounded-lg border border-gray-300'>
          <table className='w-full table-fixed'>
            <thead className='bg-[var(--gray-100)]'>
              <tr className='text-left'>
                <th className='w-[50%] px-4 py-3'>공고</th>
                <th className='w-[25%] px-4 py-3'>지원일</th>
                <th className='w-[25%] px-4 py-3'>상태</th>
              </tr>
            </thead>
            <tbody>
              {apps.map(r => (
                <tr key={r.id} className='border-t border-gray-200'>
                  <td className='truncate px-4 py-3'>{r.title}</td>
                  <td className='px-4 py-3'>{r.appliedAt}</td>
                  <td className='px-4 py-3'>
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2.5 py-1 text-caption',
                        r.status === '진행' && 'bg-[var(--blue-100)] text-[var(--blue-200)]',
                        r.status === '대기' && 'bg-[var(--gray-100)] text-[var(--gray-700)]',
                        r.status === '거절' && 'bg-[var(--red-100)] text-[var(--red-600)]',
                        r.status === '채용' && 'bg-[var(--green-100)] text-[var(--green-200)]'
                      )}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
