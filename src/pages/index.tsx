import NoticeWrapper from '@/components/ui/card/notice/mockData/noticeWrapper';
import PostWrapper from '@/components/ui/card/post/mockData/postWrapper';
import Filter from '@/components/ui/filter/filter';

export default function Home() {
  return (
    <>
      <div className='relative flex justify-end'>
        <button> 여기가 버튼임 </button>
        <Filter className='right-0 top-0 min-[480px]:top-full' />
      </div>
      <NoticeWrapper />
      <PostWrapper />
    </>
  );
}
