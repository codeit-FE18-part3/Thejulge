import { createContext, ReactNode, useContext, useState } from 'react';
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
    setTimeout(() => setMessage(null), 3000);
  };

  const toastRoot = typeof window !== 'undefined' ? document.getElementById('toast-root') : null;

  return (
    <>
      <ToastContext.Provider value={{ showToast }}>
        {children}
        {toastRoot &&
          createPortal(
            message ? (
              <div className='fixed bottom-28 right-[38%] rounded-[5px] bg-red-300 px-4 py-[10px] text-white tablet:right-2/4'>
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
