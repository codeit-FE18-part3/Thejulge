import { useCallback, useRef } from 'react';

// 안전하게 DOM 접근을 위한 hook
// DOM이 없어질 수 있는 타이밍(언마운트, 조건부 렌더링 등)을 대비해서 존재 여부 확인
function useSafeRef<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  const setRef = useCallback((node: T | null) => {
    if (node) ref.current = node;
  }, []);

  return [setRef, ref] as const;
}
export default useSafeRef;
