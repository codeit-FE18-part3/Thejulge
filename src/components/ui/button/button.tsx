import { ButtonHTMLAttributes, ElementType } from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'disabled' | 'approve' | 'reject';
  size?: 'lg' | 'md' | 'sm';
  full?: boolean;
  as?: ElementType;
} & ButtonHTMLAttributes<HTMLButtonElement> & { [key: string]: unknown };

/* 1) 공통 */
const BASE_CLASS = 'inline-flex items-center justify-center rounded-lg font-medium transition';

/* 2) 사이즈 */
const SIZE_CLASS = {
  lg: 'h-12 px-4 text-base sm:h-14 sm:px-6 sm:text-lg',
  md: 'h-10 px-4 text-sm  sm:h-11 sm:px-5 sm:text-base',
  sm: 'h-8  px-3 text-sm  sm:h-9  sm:px-4 sm:text-base',
} as const;

/* 3) variant에 따른 색상/테두리 */
const VARIANT_CLASS = {
  primary: 'bg-red-500 text-white hover:bg-red-500/90',
  secondary: 'bg-white text-red-500 border border-red-500 hover:bg-[var(--red-100)]',
  approve:
    'bg-white text-[var(--blue-200)] border border-[var(--blue-200)] hover:bg-[var(--blue-200)] hover:text-white',
  reject: 'bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white',
  disabled: 'bg-gray-400 text-white cursor-not-allowed',
} as const;

export default function Button({
  variant = 'primary',
  size = 'lg',
  full = false,
  as: Component = 'button',
  children,
  ...props
}: ButtonProps) {
  // props에서 type/disabled만 분리(중복, 충돌 방지), 나머지는 그대로 전달
  const { type, disabled, ...restProps } = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <Component
      className={`${BASE_CLASS} ${VARIANT_CLASS} ${SIZE_CLASS} ${full ? 'w-full' : ''}`}
      {...(Component === 'button'
        ? {
            disabled: variant === 'disabled' || disabled,
            type: type ?? 'button', // 폼 내부에서 의도치 않은 submit 방지
          }
        : { 'aria-disabled': variant === 'disabled' || disabled })}
      {...restProps} // onClick, aria-*, data-* 등 나머지 그대로 전달
    >
      {children}
    </Component>
  );
}
