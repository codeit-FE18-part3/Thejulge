import useAsync from '@/hooks/useAsync';
import axiosInstance from '@/lib/axios';
import { paramsSerializer } from '@/lib/utils/paramsSerializer';
import { toPostCard } from '@/lib/utils/parse';
import { NoticeQuery, PaginatedResponse } from '@/types/api';
import { PostCard } from '@/types/notice';
import { useCallback, useState } from 'react';

const INIT_FILTER_DATA: NoticeQuery = {
  sort: 'time',
};

const useNotices = (initialQuery: Partial<NoticeQuery> = {}) => {
  const { data, isLoading, isInitialized, error, fetch } = useAsync<PostCard[]>();
  const [filters, setFiltersState] = useState<NoticeQuery>(INIT_FILTER_DATA);
  const [pagination, setPagination] = useState<PaginatedResponse>({
    offset: 0,
    limit: 6,
    count: 0,
    hasNext: false,
  });

  const changeTimeFilter = useCallback((q: Partial<NoticeQuery>): Partial<NoticeQuery> => {
    const now = new Date();
    now.setSeconds(now.getSeconds() + 15); // 서버 시간 오차 대비

    // startsAtGte가 없거나, 현재보다 과거면 현재 시각으로 보정
    if (!q.startsAtGte || new Date(q.startsAtGte) < now) {
      return { ...q, startsAtGte: now.toISOString() };
    }

    return q;
  }, []);

  const fetchNotices = useCallback(
    async (query?: Partial<NoticeQuery>) => {
      // 검색 필터 업데이트
      const mergedFilter: NoticeQuery = {
        ...filters, // 내부 초기값
        limit: pagination.limit,
        offset: pagination.offset,
        ...initialQuery, // 외부 초기값
        ...(query ?? {}), //  fetchNotices 호출 시 추가 값
      };
      const queryUpdate = changeTimeFilter(mergedFilter) as NoticeQuery;
      // 상태에도 반영하여 UI와 동기화

      setFiltersState(prev => ({ ...prev, ...queryUpdate }));
      // 필터기반 패치
      const getNotices = axiosInstance
        .get('/notices', {
          params: queryUpdate,
          paramsSerializer: { serialize: paramsSerializer },
        })
        .then(res => {
          setPagination({
            offset: res.data.offset,
            limit: res.data.limit,
            count: res.data.count,
            hasNext: res.data.hasNext,
          });
          return res.data.items.map(toPostCard);
        });

      await fetch(getNotices);
    },
    [initialQuery, fetch, filters, changeTimeFilter]
  );

  const reset = useCallback(() => {
    setFiltersState(INIT_FILTER_DATA);
    fetchNotices(INIT_FILTER_DATA);
  }, []);

  return {
    notices: data ?? [],
    pagination,
    isLoading,
    isInitialized,
    error,
    fetchNotices,
    filters,
    reset,
  };
};
export default useNotices;
