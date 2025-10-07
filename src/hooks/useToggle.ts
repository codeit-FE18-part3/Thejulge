import { useCallback, useState } from 'react';

interface UseToggle {
  value: boolean;
  toggle: () => void;
  setOpen: () => void;
  setClose: () => void;
}

const useToggle = (init = false): UseToggle => {
  const [value, setValue] = useState(init);
  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setOpen = useCallback(() => setValue(true), []);
  const setClose = useCallback(() => setValue(false), []);
  return { value, toggle, setOpen, setClose };
};
export default useToggle;
