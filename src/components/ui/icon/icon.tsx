import { ICONS, ICON_SIZES, type IconName, type IconSize } from '@/constants/icon';
import { cn } from '@/lib/utils/cn';
import { forwardRef } from 'react';
interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  iconName: IconName;
  iconSize?: IconSize; // 모바일 기본 사이즈
  bigScreenSize?: IconSize; // PC에서 사이즈 다를때 사용
  className?: string;
  ariaLabel: string; // 접근성 라벨
}

/**
 * SVG 아이콘을 마스킹하여 렌더링하는 컴포넌트
 *
 * @example
 * <Icon iconName="success" iconSize="sm" className="bg-purple-600" ariaLabel="성공" />
 */

const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ iconName, iconSize = 'md', bigScreenSize, className, ariaLabel, ...props }, ref) => {
    const url = ICONS[iconName];
    const size = ICON_SIZES[iconSize];
    const bigSize = bigScreenSize ? `tablet:${ICON_SIZES[bigScreenSize]}` : '';

    return (
      <span
        ref={ref}
        className={cn('ic bg-black', size, bigSize, className)}
        style={{
          maskImage: `url(${url})`,
          WebkitMaskImage: `url(${url})`,
        }}
        role='img'
        aria-label={ariaLabel}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';

export default Icon;
