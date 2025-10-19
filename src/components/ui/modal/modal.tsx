import { Icon } from '@/components/ui';
import Button from '@/components/ui/button/button';
import type { IconName } from '@/constants/icon';
import { cn } from '@/lib/utils/cn';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Variant = 'success' | 'warning';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  variant?: Variant;
  primaryText: string;
  onPrimary: () => void;
  secondaryText?: string;
  onSecondary?: () => void;
  closeOnDimmed?: boolean;
  disablePortal?: boolean;
  className?: string;
};

const ICON_MAP: Record<Variant, { circle: IconName; glyph: IconName }> = {
  success: { circle: 'successCircle', glyph: 'success' },
  warning: { circle: 'warningCircle', glyph: 'warning' },
};

// ESC 닫기
function useEscClose(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
}

/** Header */
function ModalHeader({ variant, title }: { variant: Variant; title: string }) {
  return (
    <div className='flex flex-col items-center gap-8 px-6 pt-6 text-center'>
      <span className='relative inline-flex items-center justify-center'>
        <Icon
          iconName={ICON_MAP[variant].circle}
          iconSize='lg'
          className='bg-red-500'
          decorative
          ariaLabel={`${variant} circle`}
        />
        <Icon
          iconName={ICON_MAP[variant].glyph}
          iconSize='x-sm'
          className='absolute bg-white'
          decorative
          ariaLabel={`${variant} glyph`}
        />
      </span>
      <h2 className='text-modal font-medium text-black'>{title}</h2>
    </div>
  );
}

/** Body (optional) */
function ModalBody({ description }: { description?: ReactNode }) {
  if (!description) return null;
  return <div className='px-6 py-4 text-modal text-black'>{description}</div>;
}

/** Footer */
function ModalFooter({
  primaryText,
  onPrimary,
  secondaryText,
  onSecondary,
}: {
  primaryText: string;
  onPrimary: () => void;
  secondaryText?: string;
  onSecondary?: () => void;
}) {
  return (
    <div className={cn('flex items-center justify-center gap-3 px-6 pb-6 pt-10')}>
      {secondaryText && onSecondary && (
        <Button
          size='md'
          variant='secondary'
          className='flex-1 mobile:w-[calc(40%-6px)] mobile:flex-none'
          onClick={onSecondary}
        >
          {secondaryText}
        </Button>
      )}
      <Button
        size='md'
        variant='primary'
        className='flex-1 mobile:w-[calc(40%-6px)] mobile:flex-none'
        onClick={onPrimary}
      >
        {primaryText}
      </Button>
    </div>
  );
}

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
  className,
}: ModalProps) {
  useEscClose(open, onClose);
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
        className={cn(
          'relative w-full max-w-md rounded-2xl bg-[var(--modal-frame)] shadow-lg',
          'flex flex-col',
          className
        )}
      >
        <ModalHeader variant={variant} title={title} />
        <ModalBody description={description} />
        <ModalFooter
          primaryText={primaryText}
          onPrimary={onPrimary}
          secondaryText={secondaryText}
          onSecondary={onSecondary}
        />
      </div>
    </div>
  );

  return disablePortal ? node : createPortal(node, document.body);
}
