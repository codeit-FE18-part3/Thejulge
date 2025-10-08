import Button from '@/components/ui/button/button';
import Link from 'next/link';

interface FrameProps {
  title: string;
  content: string;
  buttonText: string;
  href: string;
}

const Frame = ({ title, content, buttonText, href }: FrameProps) => {
  return (
    <>
      <section className='flex flex-col gap-4 px-3 py-10 tablet:px-8 tablet:py-[60px]'>
        <div className='mx-auto w-full max-w-5xl'>
          <h1 className='mb-4 text-heading-s font-bold tablet:text-heading-l'>{title}</h1>
          <div className='flex flex-col items-center justify-center gap-4 rounded-xl border border-solid border-gray-200 px-6 py-[60px]'>
            <h2 className='text-body-s font-normal tablet:text-body-l'>{content}</h2>
            <div className='tablet:w-[346px]'>
              <Button size='md' as={Link} href={href} full>
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Frame;
