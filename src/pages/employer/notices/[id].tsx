import { Button } from '@/components/ui';
import RenderNotice from '@/components/ui/card/notice/components/renderNotice';
import { NoticeCard } from '@/types/notice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const oneDayMs = 24 * 60 * 60 * 1000;

export default function EmployerNoticeIdPage() {
  const router = useRouter();
  const { query } = router;
  const noticeId = Array.isArray(query.id) ? query.id[0] : query.id;

  // 역할 선택
  const [role, setRole] = useState<'employer' | 'employee'>('employer');

  useEffect(() => {
    if (role !== 'employer') {
      router.replace('/');
    }
  }, [role, router]);

  const notice: NoticeCard = {
    id: noticeId ?? '001',
    hourlyPay: 20000,
    startsAt: new Date(Date.now() + oneDayMs).toISOString(),
    workhour: 4,
    description: '주말 점심 시간대 근무자를 모집합니다.',
    closed: false,
    shopId: 'shop-bridge',
    name: '한강 브런치 카페',
    category: '카페',
    address1: '서울시 용산구',
    shopDescription: '한강 뷰를 자랑하는 브런치 카페',
    imageUrl: 'https://picsum.photos/id/1080/640/360',
    originalHourlyPay: 18000,
  };

  return (
    <div className='p-4'>
      {/* Mock 계정 선택 */}
      <div className='bg-blue-100 p-2'>
        <Button variant='primary' size='md' onClick={() => setRole('employer')} className='m-2'>
          사장님 계정
        </Button>
        <Button variant='primary' size='md' onClick={() => setRole('employee')}>
          알바생 계정
        </Button>
      </div>

      <RenderNotice
        items={{
          name: notice.name,
          category: notice.category,
          imageUrl: notice.imageUrl,
          description: notice.description,
          variant: 'notice',
          value: notice,
        }}
        buttonComponent={
          <Button variant='secondary' size='md' onClick={() => alert('클릭!')}>
            공고 편집하기
          </Button>
        }
      />
    </div>
  );
}
