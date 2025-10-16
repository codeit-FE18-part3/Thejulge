import axiosInstance from '@/lib/axios';
import { paramsSerializer } from '@/lib/utils/paramsSerializer';
import { toPostCard } from '@/lib/utils/parse';
import { NoticeQuery, PaginatedResponse } from '@/types/api';
import { PostCard } from '@/types/notice';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

interface NoticeContextValue {
  notices: PostCard[];
  pagination: PaginatedResponse;
  isLoading: boolean;
  error: string | null;
  filters: NoticeQuery;
  fetchNotices: (params?: Partial<NoticeQuery>) => Promise<void>;
  updateFilters: (filters: Partial<NoticeQuery>) => void;
  reset: () => void;
}

//현재 필터 상태(filters)의 초기값
const INIT_FILTER_DATA: NoticeQuery = {
  sort: 'time',
};

const NoticeContext = createContext<NoticeContextValue | undefined>(undefined);

// 맞춤 공고, 전체 공고, 검색된 공고등 공고 조회 관리
export const NoticeProvider = ({ children }: { children: ReactNode }) => {
  const [notices, setNotices] = useState<PostCard[]>([]); // PostCard data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<NoticeQuery>(INIT_FILTER_DATA); // 현재 페이지에서 적용 중인 필터 조건
  const [pagination, setPagination] = useState<PaginatedResponse>({
    offset: 0,
    limit: 10,
    count: 0,
    hasNext: false,
  });

  // sort=time일 때 startsAtGte를 항상 현재 시각으로 보정
  const changeTimeFilter = useCallback((q: Partial<NoticeQuery>): Partial<NoticeQuery> => {
    if (q.sort !== 'time') return q;
    const now = new Date();
    now.setSeconds(now.getSeconds() + 120);
    const nowIso = now.toISOString();
    const startsAt = q.startsAtGte ? new Date(q.startsAtGte) : null;
    if (!startsAt || isNaN(startsAt.getTime()) || startsAt.getTime() < now.getTime()) {
      return { ...q, startsAtGte: nowIso };
    }
    return q;
  }, []);

  // 공고 데이터 요청 함수. 파라미터를 넣으면 검색/정렬 가능
  const fetchNotices: NoticeContextValue['fetchNotices'] = useCallback(
    async params => {
      try {
        setIsLoading(true);
        setError(null);
        const merged = { ...filters, ...(params ?? {}) };
        const query = changeTimeFilter(merged); // time 정렬 보정
        // 뒤로가기 등으로 과거 시각이 남지 않도록 보정된 startsAtGte를 상태에도 반영
        if (query.startsAtGte !== filters.startsAtGte || query.sort !== filters.sort) {
          setFiltersState(prev => ({ ...prev, ...query }));
        }
        const res = await axiosInstance.get('/notices', {
          params: query,
          paramsSerializer: { serialize: paramsSerializer },
          // 서버에서 원하는 형태로 직렬화
        });
        // 공고 목록 업데이트
        setNotices(res.data.items.map(toPostCard)); // toPostCard 컴포넌트에서 필요한 필드만 추출
        //페이지네이션 정보 업데이트
        setPagination({
          offset: res.data.offset,
          limit: res.data.limit,
          count: res.data.count,
          hasNext: res.data.hasNext,
        });
      } catch {
        setError(`공고를 불러오는 중 오류가 발생했습니다.`);
        setNotices([]);
        setPagination(prev => ({ ...prev, count: 0, hasNext: false }));
        setFiltersState(INIT_FILTER_DATA);
      } finally {
        setIsLoading(false);
      }
    },
    [filters]
  );

  // 기존 필터를 유지하면서 filters 상태만 부분 업데이트 하여 특정 조건만 수정
  // 사용자가 선택한 필터 조건을 Context 상태에 반영하는 함수
  const updateFilters: NoticeContextValue['updateFilters'] = useCallback(
    partial => {
      setFiltersState(prev => ({ ...prev, ...changeTimeFilter(partial) }));
    },
    [changeTimeFilter]
  );

  // 공고와 필터 초기화
  const reset = useCallback(() => {
    setNotices([]);
    setFiltersState(INIT_FILTER_DATA);
  }, []);

  const value = useMemo(
    () => ({
      notices,
      pagination,
      isLoading,
      error,
      filters,
      fetchNotices,
      updateFilters,
      reset,
    }),
    [notices, pagination, isLoading, error, filters, fetchNotices, updateFilters, reset]
  );

  return <NoticeContext.Provider value={value}>{children}</NoticeContext.Provider>;
};

export const useNotice = () => {
  const context = useContext(NoticeContext);
  if (!context) throw new Error('useContext는 NoticeContext 안에서 사용해야 합니다.');
  return context;
};
