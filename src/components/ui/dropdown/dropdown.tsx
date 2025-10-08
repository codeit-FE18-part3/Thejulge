import { Icon } from '@/components/ui/icon';
import useClickOutside from '@/hooks/useClickOutside';
import useEscapeKey from '@/hooks/useEscapeKey';
import useSafeRef from '@/hooks/useSafeRef';
import useToggle from '@/hooks/useToggle';
import { cn } from '@/lib/utils/cn';
import { DROPDOWN_ICON_STYLE, DROPDOWN_ITEM_STYLE, DROPDOWN_STYLE } from './dropdown.styles';
import useDropdown from './hooks/useDropdown';

interface DropdownProps<T extends string> {
  name: string;
  ariaLabel: string;
  selected: T | undefined; // Controlled value
  values: readonly T[];
  size?: 'md' | 'sm';
  placeholder?: string;
  className?: string;
  onChange: (value: T) => void;
}

// EX : <Dropdown name="formName" ariaLabel="접근성라벨" values={ADDRESS_CODE} />
const Dropdown = <T extends string>({
  name,
  ariaLabel,
  values,
  size = 'md',
  selected,
  placeholder = '선택해주세요',
  className,
  onChange,
}: DropdownProps<T>) => {
  const { value: isOpen, toggle, setClose } = useToggle();
  const [attachDropdownRef, dropdownRef] = useSafeRef<HTMLDivElement>();
  const [attachTriggerRef, triggerRef] = useSafeRef<HTMLButtonElement>();
  const [attachListRef, listRef] = useSafeRef<HTMLDivElement>();

  const handleSelect = (val: T) => {
    onChange(val);
    setClose();
    // triggerRef.current?.focus();
  };

  const { cursorIndex, position } = useDropdown({
    values,
    isOpen,
    listRef,
    triggerRef,
    onSelect: handleSelect,
  });
  useClickOutside(dropdownRef, setClose);
  useEscapeKey(setClose);
  return (
    <div className={cn('relative inline-flex', className)} ref={attachDropdownRef}>
      {/* form 제출 대응 */}
      <input type='hidden' name={name} value={selected ?? ''} />

      {/* 옵션 버튼 */}
      <button
        ref={attachTriggerRef}
        type='button'
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className={cn(
          DROPDOWN_STYLE['base'],
          size === 'md' ? DROPDOWN_STYLE['md'] : DROPDOWN_STYLE['sm']
        )}
        onClick={toggle}
      >
        {selected ?? <span className='text-gray-400'>{placeholder}</span>}
        <Icon
          iconName={isOpen ? 'dropdownUp' : 'dropdownDown'}
          iconSize={size === 'md' ? 'sm' : 'x-sm'}
          decorative
          className={cn(
            DROPDOWN_ICON_STYLE['base'],
            size === 'md' ? DROPDOWN_ICON_STYLE['md'] : DROPDOWN_ICON_STYLE['sm']
          )}
        />
      </button>

      {/* 옵션 리스트 */}
      {isOpen && (
        <div
          ref={attachListRef}
          role='listbox'
          aria-label={ariaLabel}
          className={cn(
            'scroll-bar absolute z-[1] max-h-56 w-full rounded-md border border-gray-300 bg-white shadow-inset-top',
            position === 'top' ? 'bottom-[calc(100%+8px)]' : 'top-[calc(100%+8px)]'
          )}
        >
          {values.map((value, index) => (
            <button
              key={value}
              role='option'
              aria-selected={selected === value}
              onClick={() => handleSelect(value)}
              className={cn(
                DROPDOWN_ITEM_STYLE['base'],
                size === 'md' ? DROPDOWN_ITEM_STYLE['md'] : DROPDOWN_ITEM_STYLE['sm'],
                selected === value && 'bg-red-200 font-bold',
                cursorIndex === index && 'bg-gray-100'
              )}
            >
              {value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default Dropdown;
