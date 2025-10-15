import { Button, Notice, Table } from '@/components/ui';
import { TableRowProps } from '@/components/ui/table/TableRowProps';
import { fetchTableData } from '@/components/ui/table/testApi';
import { NoticeCard } from '@/types/notice';
import { UserType } from '@/types/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const oneDayMs = 24 * 60 * 60 * 1000;

export default function EmployerNoticeIdPage() {
  const router = useRouter();
  const { query } = router;
  const noticeId = Array.isArray(query.id) ? query.id[0] : query.id;

  /* const { role } = useAuth();

    useEffect(() => {
    if (role !== 'employer') {
      router.replace('/');
    }
  }, [role, router]); */

  const [notice, setNotice] = useState<NoticeCard>();

  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<TableRowProps[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;

  const count = data.length;
  const paginatedData = data.slice(offset, offset + limit);

  useEffect(() => {
    if (!noticeId) return;

    setNotice({
      id: noticeId,
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
    });
  }, [noticeId]);

  useEffect(() => {
    const loadTable = async () => {
      const result = await fetchTableData('employer' as UserType);
      setHeaders(result.headers);
      setData(result.data as TableRowProps[]);
    };
    loadTable();
  }, []);

  if (!notice) return;

  return (
    <>
      <div className='p-4'>
        <Notice notice={notice!} variant='notice'>
          <Button
            variant='secondary'
            size='md'
            className='w-full'
            onClick={() => router.push(`/employer/notices/${notice!.id}/edit`)}
          >
            공고 편집하기
          </Button>
        </Notice>
      </div>
      <div>
        <Table
          headers={headers}
          data={paginatedData}
          userType='employer'
          total={count}
          limit={limit}
          offset={offset}
          onPageChange={setOffset}
        />
      </div>
    </>
  );
}
