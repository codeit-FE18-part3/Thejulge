import { RefObject, useEffect, useState } from 'react';

const useDropdownPosition = (triggerRef: RefObject<HTMLButtonElement>, threshold = 300) => {
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    // 트리거 기준으로 아래쪽 여유 공간 < threshold 이면 위로, 아니면 아래로 배치
    const updatePosition = () => {
      const rect = trigger.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      setPosition(viewportHeight - rect.bottom < threshold ? 'top' : 'bottom');
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [triggerRef, threshold]);

  return position;
};

export default useDropdownPosition;
