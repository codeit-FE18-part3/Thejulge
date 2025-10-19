import { cn } from '@/lib/utils/cn';
import { ElementType, ReactNode, useEffect, useRef } from 'react';

interface HorizontalScrollProps {
  as?: ElementType;
  scrollSpeed?: number; // 마우스 휠 감도
  touchSensitivity?: number; // 터치 이동 감도 (1 기본값)
  className?: string;
  children: ReactNode;
}

// 마우스 휠 → 가로 스크롤 + 터치 스와이프
const HorizontalScroll = ({
  as: Component = 'div',
  scrollSpeed = 2,
  touchSensitivity = 1,
  className,
  children,
}: HorizontalScrollProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // 마우스 휠 세로 -> 가로
    const handleWheel = (e: WheelEvent) => {
      const atLeftEnd = el.scrollLeft <= 0;
      const atRightEnd = el.scrollLeft + el.offsetWidth >= el.scrollWidth;
      const scrollingUp = e.deltaY < 0;
      const scrollingDown = e.deltaY > 0;

      if ((atLeftEnd && scrollingUp) || (atRightEnd && scrollingDown)) return;

      e.preventDefault();
      el.scrollLeft += e.deltaY * scrollSpeed;
    };

    // 터치 스와이프 시작
    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      startX.current = e.touches[0].clientX;
      scrollStart.current = el.scrollLeft;
    };

    // 터치 스와이프
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const currentX = e.touches[0].clientX;
      const deltaX = (startX.current - currentX) * touchSensitivity;
      el.scrollLeft = scrollStart.current + deltaX;
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    el.addEventListener('touchend', handleTouchEnd);

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollSpeed, touchSensitivity]);

  return (
    <Component ref={containerRef} className={cn('none-scroll-bar select-none', className)}>
      {children}
    </Component>
  );
};
export default HorizontalScroll;
