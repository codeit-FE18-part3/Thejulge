import { RecentNoticeList } from '@/components/features';
import { useRecentNotice } from '@/components/features/noticeList/hooks/useRecentNotice';
import { Button, Modal, Notice } from '@/components/ui';
import { useToast } from '@/context/toastContext/toastContext';
import { useUserApplications } from '@/context/userApplicationsProvider';
import useAuth from '@/hooks/useAuth';
import axiosInstance from '@/lib/axios';
import { getNoticeStatus } from '@/lib/utils/getNoticeStatus';
import { toNoticeCard } from '@/lib/utils/parse';
import type { NoticeCard } from '@/types/notice';
import { UserProfile, UserRole } from '@/types/user';
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
interface ApplyItems extends ModalItems {
  noProfile?: ModalItems;
  profile?: ModalItems;
  cancel?: ModalItems;
}

// 권한별 모달 템플릿
const APPLY_ITEMS: Record<UserRole, ApplyItems> = {
  guest: {
    title: '로그인이 필요합니다',
    primaryText: '로그인하기',
    secondaryText: '닫기',
  },
  employee: {
    profile: {
      title: '아르바이트 신청을 하시겠습니까?',
      primaryText: '신청하기',
      secondaryText: '아니오',
    },
    noProfile: {
      title: '내 프로필을 먼저 등록해주세요',
      primaryText: '프로필 등록',
      secondaryText: '닫기',
    },
    cancel: {
      title: '아르바이트 신청을 취소하시겠습니까?',
      primaryText: '취소하기',
      secondaryText: '아니오',
    },
  },
  employer: {
    title: '사장님은 신청할 수 없습니다',
    primaryText: '확인',
  },
};

// 프로필 정보 존재 여부 확인
function hasProfileFields(user: UserProfile | null) {
  if (!user) return false;
  return Boolean(user.name && user.phone && user.address && user.bio);
}

// 공고 상세 초기 렌더링 SSR
export const getServerSideProps: GetServerSideProps<{ notice: NoticeCard }> = async ({
  params,
}) => {
  const { shopId, noticeId } = params as { shopId: string; noticeId: string };
  try {
    const noticeRes = await axiosInstance.get(`/shops/${shopId}/notices/${noticeId}`);
    return { props: { notice: toNoticeCard(noticeRes.data) } }; // API 응답 NoticeCard로 평탄화
  } catch {
    return {
      notFound: true,
    };
  }
};

const NoticeDetail = ({ notice }: { notice: NoticeCard }) => {
  const { role, isLogin, user } = useAuth();
  const { isApplied, applyNotice, cancelNotice, error } = useUserApplications();
  const { showToast } = useToast();
  const { handleRecentNotice } = useRecentNotice(notice);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState<ModalItems | null>(null);

  const status = getNoticeStatus(notice.closed, notice.startsAt);
  const canApply = useMemo(() => status === 'open', [status]);

  // 공고 지원하기
  const handleApplyClick = useCallback(async () => {
    if (!canApply) return; // 지난공고 , 공고마감 무시

    // 로그인 여부 확인 -> 미로그인시 : 로그인 / 닫기 모달
    if (!isLogin) {
      const items = APPLY_ITEMS.guest;
      setModal({
        ...items,
        onPrimary: () => router.push('/login'),
        onSecondary: () => setModalOpen(false),
      });
      setModalOpen(true);
      return;
    }

    // 사장님 계정은 신청 불가 -> 닫기 모달
    if (role === 'employer') {
      const items = APPLY_ITEMS.employer;
      setModal({
        ...items,
        onPrimary: () => setModalOpen(false),
      });
      setModalOpen(true);
      return;
    }

    // 알바생 프로필 여부 확인 -> 프로필 미작성시 : 마이프로필 / 닫기 모달
    const hasProfile = hasProfileFields(user);
    if (!hasProfile) {
      const items = APPLY_ITEMS.employee.noProfile;
      setModal({
        ...items,
        onPrimary: () => router.push('/my-profile'),
        onSecondary: () => setModalOpen(false),
      });
      setModalOpen(true);
      return;
    }

    // 기존 신청 여부 확인
    // 이미 신청된 상태 -> 취소 여부 모달
    if (isApplied(notice.id)) {
      const items = APPLY_ITEMS.employee.cancel;
      setModal({
        ...items,
        // 아르바이트 지원 취소
        onPrimary: async () => {
          try {
            await cancelNotice(notice.id);
            showToast('신청이 취소되었습니다.');
          } catch {
            showToast(error ?? '신청 취소 중 오류가 발생했습니다.');
          } finally {
            setModalOpen(false);
          }
        },
        onSecondary: () => setModalOpen(false),
      });
      setModalOpen(true);
      return;
    }

    // 아직 신청하지 않은 상태 -> 신청 여부 모달
    const items = APPLY_ITEMS.employee.profile;
    setModal({
      ...items,
      onPrimary: async () => {
        try {
          await applyNotice(notice.shopId, notice.id);
          showToast('신청이 완료되었습니다.');
        } catch {
          showToast(error ?? '신청 중 오류가 발생했습니다.');
        } finally {
          setModalOpen(false);
        }
      },
      onSecondary: () => setModalOpen(false),
    });
    setModalOpen(true);

    // isApplied는 내부에서 applications에만 의존하므로 배열에 제외
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canApply, isLogin, role, user, notice, router, applyNotice, cancelNotice, showToast, error]);

  // 최근 본 공고
  useEffect(() => {
    handleRecentNotice();
  }, []);
  return (
    <div>
      <Notice notice={notice} className='py-10 tablet:py-16'>
        <Button
          size='xs38'
          full
          className='font-bold'
          variant={canApply ? 'primary' : 'disabled'}
          onClick={handleApplyClick}
        >
          {isApplied(notice.id) ? '신청 취소' : canApply ? '신청하기' : '신청 불가'}
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
      <RecentNoticeList />
    </div>
  );
};
export default NoticeDetail;
