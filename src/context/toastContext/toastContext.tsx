import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast 는 Provider 안에서 사용해주세요');
  return ctx;
};

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setMessage(msg);
  };

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  });

  const toastRoot = typeof window !== 'undefined' ? document.getElementById('toast-root') : null;

  return (
    <>
      <ToastContext.Provider value={{ showToast }}>
        {children}
        {toastRoot &&
          createPortal(
            message ? (
              <div
                role='alert'
                className='fixed top-[30%] left-1/2 z-[1] -translate-x-1/2 rounded-[5px] bg-red-300 px-4 py-[10px] text-white'
              >
                {message}
              </div>
            ) : null,
            toastRoot
          )}
      </ToastContext.Provider>
    </>
  );
};

export default ToastProvider;
