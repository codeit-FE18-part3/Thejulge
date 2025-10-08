import { useEffect, useState } from 'react';

interface UseKeyboardNavigationProps<T extends string> {
  isOpen: boolean;
  values: readonly T[];
  onSelect: (value: T) => void;
}

const useKeyboardNavigation = <T extends string>({
  isOpen,
  values,
  onSelect,
}: UseKeyboardNavigationProps<T>) => {
  const [cursorIndex, setCursorIndex] = useState<number>(-1);

  useEffect(() => {
    if (!isOpen) {
      setCursorIndex(-1);
      return;
    }

    const total = values.length;
    if (!total) return;

    // 방향키를 한 방향으로 누를때 순환 구조 로직
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setCursorIndex(prev => (prev + 1) % total);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setCursorIndex(prev => (prev - 1 + total) % total);
          break;
        case 'Enter':
          e.preventDefault();
          if (cursorIndex >= 0) onSelect(values[cursorIndex]);
          break;
        case 'Escape':
          e.preventDefault();
          setCursorIndex(-1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, values, cursorIndex, onSelect]);

  return { cursorIndex, setCursorIndex };
};
export default useKeyboardNavigation;
