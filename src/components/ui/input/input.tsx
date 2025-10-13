import { cn } from '@/lib/utils/cn';
import { InputHTMLAttributes, ReactNode } from 'react';

type Props = {
  label?: string; // 라벨 텍스트
  requiredMark?: boolean; // 라벨 옆 * 표시
  error?: string; // 에러 문구(있으면 빨간 테두리/문구)
  suffix?: ReactNode; // 우측 단위/아이콘(예: '원')
  className?: string; // 외부 커스텀 클래스
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  requiredMark,
  error,
  suffix,
  className,
  id,
  disabled,
  ...rest // (type, placeholder, value, onChange 등)
}: Props) {
  const hasError = Boolean(error);
  const isDisabled = Boolean(disabled);
  const errorId = id && hasError ? `${id}-error` : undefined;

  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'text-base text-black',
            // 팀 토큰의 line-height 반영 (Body-S)
            'leading-[var(--lh-body-l)]'
          )}
        >
          {label}
          {requiredMark && <span className='ml-0.5 text-red-500'>*</span>}
        </label>
      )}

      {/* Field */}
      <div className='relative'>
        <input
          id={id}
          disabled={isDisabled}
          aria-invalid={hasError || undefined}
          aria-describedby={errorId}
          {...rest}
          className={cn(
            // 전역 공통 (tailwind.config에 정의됨)
            'base-input',
            'w-full outline-none transition',
            hasError && 'border-red-500',
            !hasError && 'focus:border-red-500',
            isDisabled && 'cursor-not-allowed bg-gray-100',
            // suffix가 있을 때 오른쪽 여백 확보
            suffix && 'pr-10'
          )}
        />

        {/* Suffix (예: 단위/아이콘) */}
        {suffix && (
          <span
            className={cn(
              'pointer-events-none absolute right-5 top-1/2 -translate-y-1/2',
              'text-base text-block'
            )}
          >
            {suffix}
          </span>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <p
          id={errorId}
          className={cn(
            'text-xs text-red-500',
            // 팀 토큰의 caption line-height 반영
            'leading-[var(--lh-caption)]'
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
}
