import { Container } from '@/components/layout';
import { Button, Modal, Notice, Table } from '@/components/ui';
import { TableRowProps } from '@/components/ui/table/TableRowProps';
import useAuth from '@/hooks/useAuth';
import axiosInstance from '@/lib/axios';
import { getNoticeStatus } from '@/lib/utils/getNoticeStatus';
import { toNoticeCard } from '@/lib/utils/parse';
import type { NoticeCard } from '@/types/notice';
import { Shop } from '@/types/shop';
import { UserRole } from '@/types/user';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface ModalItems {
  title?: string;
  primaryText?: string;
  secondaryText?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
}
interface EditItems extends ModalItems {
  noShop?: ModalItems;
  shop?: ModalItems;
}
interface ApplicationTableApiResponse {
  item: {
    id: string;
    status: string;
    user?: {
      href: string;
      item: {
        id: string;
        name: string;
        bio: string;
        phone: string;
      };
    };
    notice?: {
      item?: {
        startsAt: string;
        workhour: number;
        hourlyPay?: number;
      };
    };
  };
  links: unknown[];
}

const EDIT_ITEMS: Record<UserRole, EditItems> = {
  guest: {
    title: '로그인이 필요합니다',
    primaryText: '로그인하기',
    secondaryText: '닫기',
  },
  employer: {
    shop: {},
    noShop: {
      title: '내 가게를 먼저 등록해주세요',
      primaryText: '가게 등록',
      secondaryText: '닫기',
    },
  },
  employee: {
    title: '접근할 수 없습니다',
    primaryText: '확인',
  },
};

function hasShopFields(user: Shop | null) {
  if (!user) return false;
  return Boolean(
    user.name &&
      user.category &&
      user.address1 &&
      user.address2 &&
      user.description &&
      user.imageUrl &&
      user.originalHourlyPay
  );
}

export const getServerSideProps: GetServerSideProps<{ notice: NoticeCard }> = async ({
  params,
}) => {
  const { shopId, noticeId } = params as { shopId: string; noticeId: string };
  try {
    const noticeRes = await axiosInstance.get(`shops/${shopId}/notices/${noticeId}`);
    return { props: { notice: toNoticeCard(noticeRes.data) } };
  } catch {
    return { notFound: true };
  }
};

const EmployerNoticeDetailPage = ({ notice }: { notice: NoticeCard }) => {
  const headers = ['신청자', '소개', '전화번호', '상태'];
  const [data, setData] = useState<TableRowProps[]>([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0); // ✅ 전체 개수
  const limit = 5;

  const { role, isLogin, user } = useAuth();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState<ModalItems | null>(null);

  const status = getNoticeStatus(notice.closed, notice.startsAt);
  const isOwner = user?.shop?.item.id === notice.shopId;
  const canEdit = useMemo(() => status === 'open' && isOwner, [status, isOwner]);

  const handleEditClick = useCallback(() => {
    if (!canEdit) return;

    if (!isLogin) {
      const items = EDIT_ITEMS.guest;
      setModal({
        ...items,
        onPrimary: () => router.push('/login'),
        onSecondary: () => setModalOpen(false),
      });
      setModalOpen(true);
      return;
    }

    if (role === 'employee') {
      const items = EDIT_ITEMS.employee;
      setModal({
        ...items,
        onPrimary: () => setModalOpen(false),
      });
      setModalOpen(true);
      return;
    }

    const hasShop = hasShopFields(user?.shop?.item ?? null);
    if (!hasShop) {
      const items = EDIT_ITEMS.employer.noShop;
      setModal({
        ...items,
        onPrimary: () => router.push('/my-shop'),
        onSecondary: () => setModalOpen(false),
      });
      setModalOpen(true);
      return;
    }

    router.push(`/employer/shops/${notice.shopId}/notices/${notice.id}/edit`);
  }, [canEdit, isLogin, role, user, notice, router]);

  // 신청자 불러오기 (페이지네이션)
  useEffect(() => {
    const fetchApplications = async () => {
      const res = await axiosInstance.get<{
        items: ApplicationTableApiResponse[];
        total?: number;
        count?: number;
        hasNext?: boolean;
      }>(`/shops/${notice.shopId}/notices/${notice.id}/applications`, {
        params: { offset, limit },
      });

      const tableData: TableRowProps[] = res.data.items.map(app => {
        const userItem = app.item.user?.item;
        const noticeItem = app.item.notice?.item;

        return {
          id: app.item.id,
          name: userItem?.name ?? '-',
          bio: userItem?.bio ?? '-',
          phone: userItem?.phone ?? '-',
          startsAt: noticeItem?.startsAt ?? '-',
          workhour: noticeItem?.workhour ?? 0,
          hourlyPay: noticeItem?.hourlyPay
            ? `${noticeItem.hourlyPay.toLocaleString()}원`
            : '정보 없음',
          status: app.item.status,
          userId: userItem?.id,
          shopId: notice.shopId,
          noticeId: notice.id,
        };
      });

      setData(tableData);

      // total 적용
      const apiTotal = res.data.total ?? res.data.count;
      if (typeof apiTotal === 'number') {
        setTotal(apiTotal);
      } else {
        const hasNext = res.data.hasNext ?? tableData.length === limit;
        const guessed = offset + tableData.length + (hasNext ? 1 : 0);
        setTotal(guessed);
      }
    };

    fetchApplications();
  }, [notice.shopId, notice.id, offset, limit]);

  // 첫 페이지에서도 페이지네이션 보이도록 표시용 offset
  const displayOffset = total > limit ? (offset === 0 ? 2 : offset) : offset;

  return (
    <>
      <Notice notice={notice} className='py-10 tablet:py-16'>
        <Button
          size='xs38'
          full
          className='font-bold'
          variant={'secondary'}
          onClick={handleEditClick}
          disabled={!canEdit}
        >
          공고 편집하기
        </Button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          variant='warning'
          title={modal?.title ?? '유저 정보를 확인해주세요'}
          primaryText={modal?.primaryText ?? '확인'}
          onPrimary={modal?.onPrimary ?? (() => setModalOpen(false))}
          secondaryText={modal?.secondaryText}
          onSecondary={modal?.onSecondary}
        />
      </Notice>

      <Container isPage>
        <Table
          headers={headers}
          tableData={data}
          userRole='employer'
          total={total} // ✅ 전체 개수
          limit={limit}
          offset={displayOffset} // ✅ 표시용 offset
          onPageChange={setOffset}
          onStatusUpdate={(id, newStatus) =>
            setData(prev => prev.map(row => (row.id === id ? { ...row, status: newStatus } : row)))
          }
          shopId={notice.shopId}
          noticeId={notice.id}
        />
      </Container>
    </>
  );
};

export default EmployerNoticeDetailPage;
