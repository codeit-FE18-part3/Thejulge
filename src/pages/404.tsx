import { Container } from '@/components/layout';
import { Button, Icon } from '@/components/ui';
import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();

  return (
    <Container
      as='section'
      isPage
      className='flex flex-1 flex-col items-center justify-center gap-6 py-16 text-center'
    >
      <div className='flex items-center gap-3'>
        <Icon
          iconName='warningCircle'
          iconSize='lg'
          className='bg-red-400'
          ariaLabel='404 Not Found'
        />
      </div>

      <h1 className='text-heading-m font-bold text-gray-800'>페이지를 찾을 수 없습니다</h1>
      <p className='max-w-[520px] text-body-l text-gray-500'>
        요청하신 페이지가 삭제되었거나, 주소가 변경되었을 수 있어요. <br />
        아래 버튼을 통해 홈으로 이동하거나 공고를 다시 찾아보세요.
      </p>

      <Button variant='primary' size='xs38' onClick={() => router.push('/')}>
        홈으로 가기
      </Button>
    </Container>
  );
}
