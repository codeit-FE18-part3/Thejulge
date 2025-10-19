import useAsync from '@/hooks/useAsync';
import axiosInstance from '@/lib/axios';
import { paramsSerializer } from '@/lib/utils/paramsSerializer';
import { toPostCard } from '@/lib/utils/parse';
import { NoticeQuery } from '@/types/api';
import { PostCard } from '@/types/notice';
import { useCallback, useEffect } from 'react';

const useCustomNotices = (address?: string) => {
  const { data, isLoading, error, fetch } = useAsync<PostCard[]>();

  const fetchCustom = useCallback(async () => {
    const now = new Date();
    now.setSeconds(now.getSeconds() + 15);

    // 기본 쿼리
    const baseQuery: NoticeQuery = {
      sort: 'time',
      startsAtGte: now.toISOString(),
      limit: 3,
    };

    const firstQuery: NoticeQuery = address ? { ...baseQuery, address: [address] } : baseQuery;
    const getCustom = axiosInstance
      .get('/notices', {
        params: firstQuery,
        paramsSerializer: { serialize: paramsSerializer },
      })
      .then(async res => {
        const items = res.data.items.map(toPostCard);
        if (items.length === 0) {
          const fallbackRes = await axiosInstance.get('/notices', {
            params: baseQuery,
            paramsSerializer: { serialize: paramsSerializer },
          });
          return fallbackRes.data.items.map(toPostCard);
        }
        return items;
      });

    await fetch(getCustom);
  }, [address, fetch]);

  useEffect(() => {
    fetchCustom();
  }, []);

  return {
    notices: data ?? [],
    isLoading,
    error,
    fetchCustom,
  };
};
export default useCustomNotices;
