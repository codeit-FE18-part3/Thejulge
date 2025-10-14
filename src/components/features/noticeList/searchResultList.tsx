import { noticeListLayout } from '@/components/features/noticeList/noticeList.styles';
import { Container } from '@/components/layout';
import PostWrapper from '@/components/ui/card/post/mockData/postWrapper';
import { useSearchParams } from 'next/navigation';

// @TODO 상단 검색바에서 검색 시 해당 키워드로 검색결과 노출 
const SearchResultList = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';
  return (
    <div className='bg-red-100'>
      <Container as='section' isPage>
        <h2 className={noticeListLayout.title()}>
          <span className='text-red-500'>{query}</span>에 대한 공고 목록
        </h2>
        <PostWrapper />
      </Container>
    </div>
  );
};
export default SearchResultList;
