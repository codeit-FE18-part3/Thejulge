import { Icon } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { useEffect, useState } from 'react';

const PAGE_GROUP_SIZE = 7;
const BUTTON_ALIGN = 'flex items-center justify-center shrink-0';
interface PaginationProps {
  total: number; // 전체 개수 (count)
  offset: number; // 현재 offset
  limit: number; // 한 페이지당 아이템 수
  onPageChange: (next: number) => void; // 새 offset 전달
  className?: string;
}

/* <Pagination total={count} limit={limit}  offset={offset} onPageChange={} */

const Pagination = ({ total, offset, limit, onPageChange, className }: PaginationProps) => {
  const [pageGroup, setPageGroup] = useState(0);

  const totalPages = total ? Math.ceil(total / limit) : 0;
  const currentPage = Math.floor(offset / limit) + 1; // offset → page 변환

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

  /* 이전 그룹으로 이동 */
  const handlePrevPage = () => {
    if (!isPrevDisabled) {
      setPageGroup(prev => Math.max(prev - 1, 0));
    }
  };

  /* 다음 그룹으로 이동 */
  const handleNextPage = () => {
    if (!isNextDisabled) {
      setPageGroup(prev => ((prev + 1) * PAGE_GROUP_SIZE < totalPages ? prev + 1 : prev));
    }
  };

  /* 페이지 클릭 시 offset 계산 후 전달 */
  const handlePageClick = (page: number) => {
    const newOffset = (page - 1) * limit;
    onPageChange(newOffset);
  };

  return (
    <div className={cn(BUTTON_ALIGN, 'gap-[2px]', className)}>
      {/* 이전 */}
      <button
        className={cn(BUTTON_ALIGN, 'mr-4')}
        onClick={handlePrevPage}
        disabled={isPrevDisabled}
      >
        <Icon
          iconName='chevronLeft'
          ariaLabel='이전'
          iconSize='rg'
          className={cn(isPrevDisabled ? 'cursor-default bg-gray-400' : 'cursor-pointer bg-black')}
        />
      </button>

      {/* 페이지 번호 */}
      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={cn(
            'aspect-square w-8 rounded text-caption tablet:w-10 tablet:text-body-s',
            page === currentPage && 'bg-red-300 font-bold text-white'
          )}
        >
          {page}
        </button>
      ))}

      {/* 다음 */}
      <button
        className={cn(BUTTON_ALIGN, 'ml-4')}
        onClick={handleNextPage}
        disabled={isNextDisabled}
      >
        <Icon
          iconName='chevronRight'
          ariaLabel='이후'
          iconSize='rg'
          className={cn(isNextDisabled ? 'cursor-default bg-gray-400' : 'cursor-pointer bg-black')}
        />
      </button>
    </div>
  );
};

export default Pagination;
