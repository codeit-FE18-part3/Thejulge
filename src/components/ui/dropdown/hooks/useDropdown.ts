import { RefObject } from 'react';
import useDropdownPosition from './._useDropdownPosition';
import useDropdownScroll from './useDropdownScroll';
import useKeyboardNavigation from './useKeyboardNavigation';

interface UseDropdownProps<T extends string> {
  values: readonly T[];
  isOpen: boolean;
  triggerRef: RefObject<HTMLButtonElement>;
  listRef: RefObject<HTMLDivElement>;
  onSelect: (value: T) => void;
}

const useDropdown = <T extends string>({
  values,
  isOpen,
  triggerRef,
  listRef,
  onSelect,
}: UseDropdownProps<T>) => {
  const position = useDropdownPosition(triggerRef);
  const { cursorIndex, setCursorIndex } = useKeyboardNavigation({ isOpen, values, onSelect });

  useDropdownScroll(listRef, cursorIndex);

  return {
    cursorIndex,
    position,
    setCursorIndex,
  };
};

export default useDropdown;
