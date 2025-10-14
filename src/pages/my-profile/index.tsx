import Frame from '@/components/layout/frame/frame';
import Button from '@/components/ui/button/button';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
  const { bootstrapped, isLogin, user } = useAuth(); // 로그인/부트 완료 확인
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [apps, setApps] = useState<ApplicationRow[]>([]);

  useEffect(() => {
    // 부트스트랩 끝나고 로그인된 상태일 때만 조회
    if (!bootstrapped) return;

    // 로그인 안된 경우: 그냥 빈 상태로 두고 렌더 (로그인/회원가입은 헤더에서 노출됨)
    if (!isLogin) {
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      try {
        // TODO: 실제 API 연결
        // 1) 내 프로필 조회: 없으면 null 유지
        //    예: const res = await apiGetMyProfile();
        //    setProfile(res ?? null);

        // 데모: 유저가 등록하지 않았다는 가정 → null 유지
        // setProfile(null);

        // 만약 등록되어 있다면 이렇게 세팅됩니다.
        // setProfile({
        //   id: 'me',
        //   name: '김승우',
        //   phone: '010-1234-4321',
        //   region: '선호 지역: 서울시 도봉구',
        //   bio: '열심히 일 하겠습니다',
        // });

        // 2) 신청 내역 조회(프로필이 있을 때만 노출)
        // const appsRes = await apiGetApplications();
        // setApps(appsRes ?? []);

        setApps([]); // 데모: 일단 비어있게
      } finally {
        setLoading(false);
      }
    })();
  }, [bootstrapped, isLogin]);

  return (
    <main className='mx-auto w-full max-w-[960px] px-4 py-6 tablet:py-8'>
      {/* Frame은 문자열 props만 사용합니다. */}
      <Frame
        title='내 프로필'
        content={
          profile
            ? '등록된 프로필'
            : '내 프로필을 등록하고 원하는 가게에 지원해 보세요.'
        }
        buttonText={profile ? '수정하기' : '내 프로필 등록하기'}
        href='/my-profile/register'
      />

      {/* 로딩 중이면 아무것도 더 렌더하지 않음(위 Frame만 보이게) */}
      {loading && null}

      {/* ① 프로필이 없을 때: 상세/신청내역 섹션을 “표시하지 않습니다.” (요구사항) */}
      {!loading && !profile && null}

      {/* ② 프로필이 있을 때만 기본정보/신청내역 노출 */}
      {!loading && profile && (
        <>
          {/* 기본 정보 카드 */}
          <section className='mt-4 rounded-xl bg-white p-6 shadow'>
            <div className='mb-3 flex items-center justify-between'>
              <h2 className='text-heading-s font-medium'>기본 정보</h2>
              <Link href='/my-profile/register'>
                <Button size='sm' variant='secondary'>편집하기</Button>
              </Link>
            </div>

            <div className='rounded-xl bg-[var(--red-100)] p-6'>
              <dl className='grid grid-cols-1 gap-y-3 tablet:grid-cols-2'>
                <div>
                  <dt className='text-body-s text-[var(--gray-600)]'>이름</dt>
                  <dd className='text-body-l'>{profile.name}</dd>
                </div>
                <div>
                  <dt className='text-body-s text-[var(--gray-600)]'>연락처</dt>
                  <dd className='text-body-l'>{profile.phone}</dd>
                </div>
                <div className='tablet:col-span-2'>
                  <dt className='text-body-s text-[var(--gray-600)]'>선호 지역</dt>
                  <dd className='text-body-l'>{profile.region}</dd>
                </div>
              </dl>

              {profile.bio && (
                <p className='mt-4 text-body-m'>{profile.bio}</p>
              )}
            </div>
          </section>

          {/* 신청 내역 */}
          <section className='mt-6 rounded-xl bg-white p-6 shadow'>
            <h2 className='mb-3 text-heading-s font-medium'>신청 내역</h2>

            {/* 팀 테이블로 교체하실 경우: 아래 block을 공용 table 컴포넌트로 대체 */}
            {apps.length === 0 ? (
              <div className='flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-300 p-10 text-center'>
                <p className='text-body-m text-[var(--gray-600)]'>아직 신청 내역이 없어요.</p>
                <Link href='/'>
                  <Button size='md' variant='primary'>공고 보러가기</Button>
                </Link>
              </div>
            ) : (
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
            )}
          </section>
        </>
      )}
    </main>
  );
}
