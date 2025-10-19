import { useEffect } from 'react';

// @example : useClickOutside(dropdownRef, setClose);
type ClickOutsideHandler = (e: MouseEvent | TouchEvent) => void;

const useClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: ClickOutsideHandler
): void => {
  useEffect(() => {
    const listener: ClickOutsideHandler = e => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler(e);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
