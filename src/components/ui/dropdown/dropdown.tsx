import { Icon } from '@/components/ui/icon';
import useClickOutside from '@/hooks/useClickOutside';
import useToggle from '@/hooks/useToggle';
import { cn } from '@/lib/utils/cn';
import { useRef, useState } from 'react';
const DROPDOWN_STYLE = {
  base: 'flex-1 text-left min-w-[110px]',
  md: 'base-input !pr-10',
  sm: 'rounded-md bg-gray-100 py-1.5 pl-3 pr-7 text-body-s font-bold',
} as const;
const DROPDOWN_ICON_STYLE = {
  base: 'absolute top-1/2 -translate-y-1/2',
  md: 'right-5',
  sm: 'right-3',
} as const;

const DROPDOWN_ITEM_STYLE = {
  base: 'border-b-[1px] last:border-b-0 block w-full whitespace-nowrap border-gray-200 px-5 text-body-s hover:bg-gray-50',
  md: 'py-3',
  sm: 'py-2',
} as const;

interface DropdownProps<T extends string> {
  name: string;
  label: string;
  values: readonly T[];
  size?: 'md' | 'sm';
  defaultValue?: T;
  placeholder?: string;
  className?: string;
}

const Dropdown = <T extends string>({
  name,
  label,
  values,
  size = 'md',
  defaultValue,
  placeholder = '선택해주세요',
  className,
}: DropdownProps<T>) => {
  const { value: isOpen, toggle, setClose } = useToggle();
  const [selected, setSelected] = useState<T | undefined>(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: T) => {
    setSelected(value);
    setClose();
  };

  useClickOutside(dropdownRef, () => setClose());

  return (
    <div className={cn('relative inline-flex', className)} ref={dropdownRef}>
      {/* form 제출 대응 */}
      <input type='hidden' name={name} value={selected ?? ''} />

      {/* 옵션 버튼 */}
      <button
        type='button'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-label={label}
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
          ariaLabel='옵션선택'
          className={cn(
            DROPDOWN_ICON_STYLE['base'],
            size === 'md' ? DROPDOWN_ICON_STYLE['md'] : DROPDOWN_ICON_STYLE['sm']
          )}
        />
      </button>

      {/* 옵션 리스트 */}
      {isOpen && (
        <div
          role='listbox'
          aria-label={label}
          className='shadow-inset-top scroll-bar absolute top-[calc(100%+8px)] z-[1] max-h-56 w-full rounded-md border border-gray-300 bg-white'
        >
          {values.map(value => (
            <button
              key={value}
              role='option'
              aria-selected={selected === value}
              className={cn(
                DROPDOWN_ITEM_STYLE['base'],
                size === 'md' ? DROPDOWN_ITEM_STYLE['md'] : DROPDOWN_ITEM_STYLE['sm'],
                selected === value && 'bg-red-100 font-bold'
              )}
              onClick={() => handleSelect(value)}
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
