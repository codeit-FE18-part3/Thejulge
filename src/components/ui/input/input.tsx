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
  className = '',
  id,
  disabled,
  ...rest // (type, placeholder, value, onChange, inputMode 등)
}: Props) {
  const hasError = Boolean(error);
  const isDisabled = Boolean(disabled);
  const errorId = id && hasError ? `${id}-error` : undefined;

  return (
    <div className={`flex w-full flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className='text-[var(--black)]/80 text-sm'>
          {label}
          {requiredMark && <span className='ml-0.5 text-[var(--red-500)]'>*</span>}
        </label>
      )}

      <div className='relative'>
        <input
          id={id}
          disabled={isDisabled}
          aria-invalid={hasError || undefined}
          aria-describedby={errorId}
          {...rest}
          className={[
            'base-input', // ← 전역 공통
            'w-full outline-none transition',
            hasError ? 'border-[var(--red-500)]' : '',
            hasError ? '' : 'focus:border-[var(--red-500)]',
            isDisabled ? 'cursor-not-allowed bg-[var(--gray-100)]' : '',
            suffix ? 'pr-12' : '', // 우측 단위 있을 때 텍스트 여백
          ].join(' ')}
        />

        {suffix && (
          <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--gray-500)]'>
            {suffix}
          </span>
        )}
      </div>

      {hasError && (
        <p id={errorId} className='text-xs text-[var(--red-500)]'>
          {error}
        </p>
      )}
    </div>
  );
}
