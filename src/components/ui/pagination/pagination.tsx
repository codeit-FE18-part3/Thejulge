import { Icon } from '@/components/ui';
import { useState } from 'react';

const PAGE_GROUP_SIZE = 7;
const ITEMS_PER_PAGE = 5;

interface PaginationProps {
  totalItems: number;
}
// totalItems 는 API 통신 시 Response 로 받는 """count""" 부모로부터 넘겨주기!

const Pagination = ({ totalItems }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(totalItems > 0 ? 1 : 0);
  // [currentPage, setCurrentPage] 는 부모 페이지에서 받아올 데이터 내용
  //  - 그래야 페이지 바뀔 때 부모 페이지에 state 영향 줘서 리렌더링해서 화면 다시 보여줌
  //  - 이후 페이지 작업 시 위의 state 선언은 부모페이지에서 하고 값들 props 로 받기
  const [pageGroup, setPageGroup] = useState(0);

  const totlaPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  if (totlaPages === 0) return null;
  const startPage = pageGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totlaPages);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  const isPrevDisabled = pageGroup === 0;
  const isNextDisabled = (pageGroup + 1) * PAGE_GROUP_SIZE >= totlaPages;

  return (
    <>
      <div className='flex h-14 items-center justify-center bg-white tablet:h-16'>
        <div className='flex h-8 items-center justify-center gap-[2px] px-3 py-2 tablet:h-10'>
          <Icon
            className={`h-5 w-5 ${isPrevDisabled ? 'bg-gray-400' : 'cursor-pointer'}`}
            onClick={() => {
              if (!isPrevDisabled) {
                setPageGroup(prev => Math.max(prev - 1, 0));
              }
            }}
            iconName='chevronLeft'
            ariaLabel='이전'
          />
          {pageNumbers.map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={
                page === currentPage
                  ? 'h-8 w-8 rounded bg-red-300 text-caption text-white tablet:text-body-s'
                  : 'h-8 w-8 text-caption tablet:text-body-s'
              }
            >
              {page}
            </button>
          ))}
          <Icon
            className={`h-5 w-5 ${isNextDisabled ? 'bg-gray-400' : 'cursor-pointer'}`}
            onClick={() => {
              if (!isNextDisabled) {
                setPageGroup(prev => ((prev + 1) * PAGE_GROUP_SIZE < totlaPages ? prev + 1 : prev));
              }
            }}
            iconName='chevronRight'
            ariaLabel='이후'
          />
        </div>
      </div>
    </>
  );
};

export default Pagination;
