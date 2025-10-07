import { useEffect } from 'react';

// @example : useEscapeKey(setClose);
type EscapeHandler = (e: KeyboardEvent) => void;

const useEscapeKey = (handler: EscapeHandler) => {
  useEffect(() => {
    const listener: EscapeHandler = e => {
      if (e.key !== 'Escape') return;
      handler(e);
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [handler]);
};

export default useEscapeKey;
