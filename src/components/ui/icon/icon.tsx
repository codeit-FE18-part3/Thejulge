import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { ICONS, ICON_SIZES, type IconName, type IconSize } from '@/constants/icon';
interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  iconName: IconName;
  iconSize?: IconSize;
  className?: string;
  ariaLabel?: string;
}

/**
 * SVG 아이콘을 마스킹하여 렌더링하는 컴포넌트
 *
 * @example
 * <Icon iconName="success" iconSize="sm" className="bg-purple-600" ariaLabel="성공" />
 */

const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ iconName, iconSize = 'md', className, ariaLabel, ...props }, ref) => {
    const url = ICONS[iconName];
    const size = ICON_SIZES[iconSize];

    return (
      <span
        ref={ref}
        className={cn('ic', size, className)}
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
