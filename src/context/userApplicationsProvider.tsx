// context/UserApplicationsProvider.tsx
import { getAllUserApplications, postApplication, putApplication } from '@/api/applications';
import useAuth from '@/hooks/useAuth';
import { ApiResponse } from '@/types/api';
import { ApplicationItem, ApplicationStatus } from '@/types/applications';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface UserApplicationsContextValue {
  applications: ApiResponse<ApplicationItem>[];
  isLoading: boolean;
  error: string | null;
  isApplied: (noticeId: string) => boolean; // 특정 공고 지원 여부
  applicationStatus: (noticeId: string) => ApplicationStatus | null; // 특정 공고의 지원 상태
  applyNotice: (shopId: string, noticeId: string) => Promise<void>; // 공고 지원
  cancelNotice: (noticeId: string) => Promise<void>; // 공고 취소
  refresh: () => Promise<void>; // 전체 새로고침(fetch)
}

const UserApplicationsContext = createContext<UserApplicationsContextValue | null>(null);

// 유저 공고 조회, 신청, 취소 (마이페이지, 상단 알림, 공고 상세 동일한 데이터 사용)
export const UserApplicationsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<ApiResponse<ApplicationItem>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 전체 신청 내역 불러오기
  const fetchAllApplications = useCallback(async () => {
    if (!user?.id) return;
    try {
      setIsLoading(true);
      setError(null);
      const all = await getAllUserApplications({ userId: user.id, limit: 50 });
      setApplications(all);
    } catch {
      setError(`신청 내역을 불러오지 못했습니다`);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // 로그인 유저 변경 시 fetch
  useEffect(() => {
    if (user) fetchAllApplications();
    else setApplications([]);
  }, [user, fetchAllApplications]);

  // 특정 공고 지원 여부
  const isApplied = useCallback(
    (noticeId: string) =>
      applications.some(
        app =>
          app.item.notice.item.id === noticeId &&
          (app.item.status === 'pending' || app.item.status === 'accepted')
      ),
    [applications]
  );

  // 특정 공고의 지원 상태 반환
  const applicationStatus = useCallback(
    (noticeId: string): ApplicationStatus | null => {
      const found = applications.find(app => app.item.notice.item.id === noticeId);
      return found ? found.item.status : null;
    },
    [applications]
  );

  // 특정 공고 지원
  const applyNotice = useCallback(
    async (shopId: string, noticeId: string) => {
      if (!user?.id) {
        setError('로그인이 필요합니다.');
        return;
      }
      await postApplication(shopId, noticeId);
      await fetchAllApplications(); // 최신화 반영
    },
    [user, fetchAllApplications]
  );

  // 특정 공고 지원 취소
  const cancelNotice = useCallback(
    async (noticeId: string) => {
      if (!user?.id) {
        setError('로그인이 필요합니다');
        return;
      }

      const target = applications.find(app => app.item.notice.item.id === noticeId);

      if (!target) {
        setError('신청 내역을 찾을 수 없습니다');
        return;
      }
      const shopId = target.item.shop.item.id;
      const applicationId = target.item.id;

      await putApplication(shopId, noticeId, applicationId);
      await fetchAllApplications(); // 최신화 반영
    },
    [applications, user, fetchAllApplications]
  );

  const value = useMemo(
    () => ({
      applications,
      isLoading,
      error,
      isApplied,
      applicationStatus,
      applyNotice,
      cancelNotice,
      refresh: fetchAllApplications,
    }),
    [
      applications,
      isLoading,
      error,
      isApplied,
      applicationStatus,
      applyNotice,
      cancelNotice,
      fetchAllApplications,
    ]
  );

  return (
    <UserApplicationsContext.Provider value={value}>{children}</UserApplicationsContext.Provider>
  );
};

export const useUserApplications = () => {
  const context = useContext(UserApplicationsContext);
  if (!context) {
    throw new Error('useUserApplications는 Provider 안에서 사용해야 합니다.');
  }
  return context;
};
