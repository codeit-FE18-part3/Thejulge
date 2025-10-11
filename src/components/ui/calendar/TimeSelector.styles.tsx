import React from 'react';

const TIME_SCROLL_CLASS =
  'flex max-h-[88px] flex-col gap-4 overflow-y-auto rounded border p-2 text-xl';

export const ScrollList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={TIME_SCROLL_CLASS}>{children}</div>
);
