const NoticeListHeader = ({ q }: { q?: string }) => {
  return (
    <h2 className='text-heading-l font-bold'>
      {q ? (
        <>
          <span className='text-red-500'>{q}</span>에 대한 공고 목록
        </>
      ) : (
        '전체공고'
      )}
    </h2>
  );
};

export default NoticeListHeader;
