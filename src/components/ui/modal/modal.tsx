import { Icon } from '@/components/ui';
import Button from '@/components/ui/button/button';
import type { IconName } from '@/constants/icon';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Variant = 'success' | 'warning'; //체크 아이콘 | 느낌표 아이콘

type ModalProps = {
  open: boolean; // 모달 열림 여부
  onClose: () => void; // 닫기 함수
  title: string; // 타이틀 (필수)
  description?: ReactNode; // 본문 (선택)
  variant?: Variant; // success | warning (기본 warning)
  primaryText: string; // 주 버튼 라벨
  onPrimary: () => void; // 주 버튼 핸들러
  secondaryText?: string; // 보조 버튼 라벨 (선택)
  onSecondary?: () => void; // 보조 버튼 핸들러
  closeOnDimmed?: boolean; // 딤 클릭 닫기 여부 (기본 true)
  disablePortal?: boolean; // 포털 비활성화 (기본 false)
  className?: string; // 커스텀 class 추가
};

const ICON_MAP: Record<Variant, { circle: IconName; glyph: IconName }> = {
  success: { circle: 'successCircle', glyph: 'success' },
  warning: { circle: 'warningCircle', glyph: 'warning' },
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  variant = 'warning',
  primaryText,
  onPrimary,
  secondaryText,
  onSecondary,
  closeOnDimmed = true,
  disablePortal = false,
  className = '',
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const node = (
    <div
      aria-modal='true'
      role='dialog'
      className='fixed inset-0 z-[1000] flex items-center justify-center p-4'
    >
      {closeOnDimmed ? (
        <button
          type='button'
          aria-label='모달 닫기'
          className='absolute inset-0 bg-[var(--modal-dimmed)]'
          onClick={onClose}
        />
      ) : (
        <div className='absolute inset-0 bg-[var(--modal-dimmed)]' aria-hidden />
      )}

      <div
        className={[
          'relative w-full max-w-md rounded-2xl bg-[var(--modal-frame)]',
          'flex flex-col',
          className,
        ].join(' ')}
      >
        {/* Header (아이콘, 제목) */}
        <div className='flex flex-col items-center gap-3 px-6 pt-6 text-center'>
          <span className='relative inline-flex items-center justify-center'>
            <Icon
              iconName={ICON_MAP[variant].circle}
              iconSize='lg'
              className='bg-[var(--red-500)]'
              ariaLabel={`${variant} circle`}
              decorative
            />
            <Icon
              iconName={ICON_MAP[variant].glyph}
              iconSize='x-sm'
              className='absolute bg-white'
              ariaLabel={`${variant} glyph`}
              decorative
            />
          </span>
          <h2 className='font-medium leading-[var(--lh-modal)] text-[var(--black)] text-[var(--fs-modal)]'>
            {title}
          </h2>
        </div>

        {/* Body(description ->선택) */}
        {description && (
          <div className='px-6 py-4 leading-[var(--lh-body-m)] text-[var(--black)] text-[var(--fs-body-m)]'>
            {description}
          </div>
        )}

        {/* Footer (버튼)*/}
        <div className='flex items-center justify-center gap-3 px-6 pb-6 pt-6'>
          {secondaryText && (
            <Button size='md' variant='secondary' onClick={onSecondary}>
              {secondaryText}
            </Button>
          )}
          <Button size='md' variant='primary' onClick={onPrimary}>
            {primaryText}
          </Button>
        </div>
      </div>
    </div>
  );

  return disablePortal ? node : createPortal(node, document.body);
}
