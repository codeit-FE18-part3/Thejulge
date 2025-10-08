import React from 'react';

export const ScrollList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className='flex max-h-[104px] flex-col gap-4 overflow-y-auto rounded border p-2 text-lg'>
    {children}
  </div>
);
