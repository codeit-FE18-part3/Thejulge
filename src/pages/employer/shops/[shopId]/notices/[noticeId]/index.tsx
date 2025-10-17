import { getApplications, getNoticeById } from '@/api/applications';
import { Button, Notice, Table } from '@/components/ui';
import { TableRowProps } from '@/components/ui/table/TableRowProps';
import useAuth from '@/hooks/useAuth';
import { NoticeCard } from '@/types/notice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EmployerNoticePage = () => {
  const router = useRouter();
  const { query } = router;
  const shopId = Array.isArray(query.shopId) ? query.shopId[0] : query.shopId;
  const noticeId = Array.isArray(query.noticeId) ? query.noticeId[0] : query.noticeId;

  const { role } = useAuth();

  const [notice, setNotice] = useState<NoticeCard>();

  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<TableRowProps[]>([]);

  const [offset, setOffset] = useState(0);
  const limit = 5;

  // employer만 접근 가능
  useEffect(() => {
    if (role !== 'employer') {
      router.replace('/');
    }
  }, [role, router]);

  // 공고 조회
  useEffect(() => {
    if (!shopId || !noticeId) return;

    const fetchNotice = async () => {
      const result = await getNoticeById(shopId, noticeId);
      setNotice(result);
    };

    fetchNotice().catch(() => {
      setNotice(undefined);
    });
  }, [shopId, noticeId]);

  // 지원자 목록 조회
  useEffect(() => {
    if (!shopId || !noticeId) return;

    const fetchApplications = async () => {
      const applications = await getApplications(shopId, noticeId, offset, limit);
      setHeaders(['ID', '이름', '이메일', '상태']);
      setData(
        applications.map(app => ({
          id: app.id,
          name: app.user?.name ?? '-',
          startsAt: '-',
          workhour: 0,
          hourlyPay: '-',
          status: app.status,
          bio: '-',
          phone: 0,
        }))
      );
    };

    fetchApplications();
  }, [shopId, noticeId, offset]);

  if (!notice) return null;

  const paginatedData = data;

  return (
    <div className='p-4'>
      <Notice notice={notice} variant='notice'>
        <Button
          variant='secondary'
          size='md'
          className='w-full'
          onClick={() => router.push(`/employer/notices/${notice.id}/edit`)}
        >
          공고 편집하기
        </Button>
      </Notice>
      <Table
        headers={headers}
        data={paginatedData}
        userType='employer'
        total={data.length}
        limit={limit}
        offset={offset}
        onPageChange={setOffset}
      />
    </div>
  );
};

export default EmployerNoticePage;
