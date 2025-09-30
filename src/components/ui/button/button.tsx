/*
 사용법 예:
 <Button variant="primary" size="lg" full> 로그인 하기</Button>
 // 페이지에서 Link로 쓰고 싶을 때만 예:
<Button as={Link} href="/about" variant="secondary">About</Button>
 */

import { ButtonHTMLAttributes, ElementType } from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'disabled' | 'approve' | 'reject';
  size?: 'lg' | 'md' | 'sm';
  full?: boolean;
  /* 기본은 'button'. 필요 시 as={Link} 처럼 다른 컴포넌트로 렌더 */
  as?: ElementType;
} & ButtonHTMLAttributes<HTMLButtonElement> & { [key: string]: unknown };

export default function Button({
  variant = 'primary',
  size = 'lg',
  full = false,
  as: Component = 'button',
  children,
  ...props
}: ButtonProps) {
  /* 1) 사이즈 */
  const sizeClass =
    size === 'lg'
      ? 'h-12 px-4 text-base sm:h-14 sm:px-6 sm:text-lg'
      : size === 'md'
        ? 'h-10 px-4 text-sm sm:h-11 sm:px-5 sm:text-base'
        : 'h-8 px-3 text-sm sm:h-9 sm:px-4 sm:text-base';

  /* 2) variant에 따른 색상/테두리 */
  let variantClass = '';
  if (variant === 'primary') {
    variantClass = 'bg-[#EA3C12] text-white hover:bg-[#d63810]';
  } else if (variant === 'secondary') {
    variantClass = 'bg-white text-[#EA3C12] border border-[#EA3C12] hover:bg-[#fff5f2]';
  } else if (variant === 'approve') {
    variantClass =
      'bg-white text-[#0080FF] border border-[#0080FF] hover:bg-[#0080FF] hover:text-white';
  } else if (variant === 'reject') {
    variantClass =
      'bg-white text-[#EA3C12] border border-[#EA3C12] hover:bg-[#EA3C12] hover:text-white';
  } else if (variant === 'disabled') {
    variantClass = 'bg-[#A9A7AE] text-white cursor-not-allowed';
  }

  /* 3) 공통 */
  const baseClass = 'inline-flex items-center justify-center rounded-lg font-medium transition';

  return (
    <Component
      className={`${baseClass} ${variantClass} ${sizeClass} ${full ? 'w-full' : ''}`}
      {...(Component === 'button'
        ? { disabled: variant === 'disabled' || props.disabled }
        : { 'aria-disabled': variant === 'disabled' || props.disabled })}
      {...props} // EX) type="submit" onClick={handleClick} aria-label="로그인 버튼"
    >
      {children}
    </Component>
  );
}
