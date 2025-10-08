import { RefObject, useEffect, useState } from 'react';

const useDropdownPosition = (triggerRef: RefObject<HTMLButtonElement>) => {
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const updatePosition = () => {
      const rect = trigger.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      setPosition(viewportHeight - rect.bottom < 300 ? 'top' : 'bottom');
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [triggerRef]);

  return position;
};

export default useDropdownPosition;
