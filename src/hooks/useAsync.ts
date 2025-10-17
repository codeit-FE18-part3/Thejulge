import { ApiAsync } from '@/types/api';
import { useCallback, useState } from 'react';

interface UseAsyncState<T> extends ApiAsync{
  data: T | null;
  fetch: (promise: Promise<T>) => Promise<T | void>;
  reset: () => void;
}

const useAsync = <T>(): UseAsyncState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetch = useCallback(async (promise: Promise<T>) => {
    try {
      setIsInitialized(true);
      setIsLoading(true);
      setError(null);
      const result = await promise;
      setData(result);
      return result;
    } catch (err) {
      setError(`요청 중 오류가 발생했습니다 : ${err}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
    setIsInitialized(false);
  }, []);

  return { data, isLoading, isInitialized, error, fetch, reset };
};
export default useAsync;
