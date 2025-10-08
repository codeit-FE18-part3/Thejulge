import { RefObject } from 'react';
import useDropdownPosition from './useDropdownPosition';
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
  const { cursorIndex } = useKeyboardNavigation({ isOpen, values, onSelect });

  useDropdownScroll(listRef, cursorIndex);

  return {
    cursorIndex,
    position,
  };
};

export default useDropdown;
