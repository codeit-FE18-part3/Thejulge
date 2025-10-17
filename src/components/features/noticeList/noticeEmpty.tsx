import { Button } from '@/components/ui';
import { useRouter } from 'next/router';

interface NoticeEmptyProps {
  q?: string;
  onReset?: () => void;
}

const NoticeEmpty = ({ q, onReset }: NoticeEmptyProps) => {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center text-gray-500'>
      <h3 className='text-heading-sm font-semibold text-gray-700'>
        {q ? `"${q}"에 대한 공고를 찾을 수 없습니다.` : '검색 조건에 맞는 공고가 없습니다.'}
      </h3>
      {!q && (
        <p className='mt-2 text-body-s text-gray-500'>
          새로운 아르바이트 공고가 올라오면 이곳에서 확인할 수 있어요.
        </p>
      )}

      <div className='mt-10 flex gap-3'>
        {q ? (
          <Button variant='primary' size='xs38' onClick={() => router.push('/')}>
            홈으로 돌아가기
          </Button>
        ) : (
          <Button variant='secondary' size='sm' onClick={onReset}>
            전체 공고 보기
          </Button>
        )}
      </div>
    </div>
  );
};
export default NoticeEmpty;
