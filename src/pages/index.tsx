import Filter from '@/components/ui/filter/filter';
import PostWrapper from '@/components/ui/post/postWrapper';

export default function Home() {
  return (
    <>
      <div className='relative flex justify-end'>
        <button> 여기가 버튼임 </button>
        <Filter className='right-0 top-0 min-[480px]:top-full' />
      </div>
      <PostWrapper />
    </>
  );
}
