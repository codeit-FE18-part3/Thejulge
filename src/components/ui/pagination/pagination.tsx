import { Icon } from '@/components/ui';
import { useEffect, useState } from 'react';

const PAGE_GROUP_SIZE = 7;

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}
// totalItems 는 API 통신 시 Response 로 받는 """count""" 부모로부터 넘겨주기!

const Pagination = ({ totalItems, currentPage, itemsPerPage, onPageChange }: PaginationProps) => {
  const [pageGroup, setPageGroup] = useState(0);

  const totalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : 0;

  useEffect(() => {
    const newGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
    setPageGroup(newGroup);
  }, [currentPage]);

  if (totalPages < 1) return null;

  const startPage = pageGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  const isPrevDisabled = pageGroup === 0;
  const isNextDisabled = (pageGroup + 1) * PAGE_GROUP_SIZE >= totalPages;

  return (
    <>
      <div className='flex h-14 items-center justify-center bg-white tablet:h-16'>
        <div className='flex h-8 items-center justify-center gap-[2px] px-3 py-2 tablet:h-10'>
          <button className='flex items-center justify-center'>
            <Icon
              className={`h-5 w-5 ${isPrevDisabled ? 'cursor-default bg-gray-400' : 'cursor-pointer'}`}
              onClick={() => !isPrevDisabled && setPageGroup(prev => Math.max(prev - 1, 0))}
              iconName='chevronLeft'
              ariaLabel='이전'
            />
          </button>
          {pageNumbers.map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={
                page === currentPage
                  ? 'h-8 w-8 rounded bg-red-300 text-caption text-white tablet:text-body-s'
                  : 'h-8 w-8 text-caption tablet:text-body-s'
              }
            >
              {page}
            </button>
          ))}
          <button className='flex items-center justify-center'>
            <Icon
              className={`h-5 w-5 ${isNextDisabled ? 'cursor-default bg-gray-400' : 'cursor-pointer'}`}
              onClick={() =>
                !isNextDisabled &&
                setPageGroup(prev => ((prev + 1) * PAGE_GROUP_SIZE < totalPages ? prev + 1 : prev))
              }
              iconName='chevronRight'
              ariaLabel='이후'
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
