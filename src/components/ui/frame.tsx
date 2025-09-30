import { useRouter } from 'next/router';

interface FrameProps {
  title: string;
  content: string;
  buttonText: string;
  address: string;
}

const Frame = ({ title, content, buttonText, address }: FrameProps) => {
  const router = useRouter();
  return (
    <>
      <section className='flex flex-col gap-4 px-3 py-10 tablet:px-8 tablet:py-[60px] desktop:px-[237px] desktop:py-[60px]'>
        <h1 className='text-xl font-bold text-black tablet:text-[28px]'>{title}</h1>
        <div className='flex flex-col items-center justify-center gap-4 rounded-xl border border-solid border-gray-200 px-6 py-[60px]'>
          <h2 className='text-sm font-normal text-black tablet:text-base'>{content}</h2>
          <button
            onClick={() => router.push(`/${address}`)}
            className='rounded-md bg-[#ea3c12] px-5 py-[10px] text-sm font-bold text-white tablet:px-[136px] tablet:py-[14px] tablet:text-base'
          >
            {buttonText}
          </button>
        </div>
      </section>
    </>
  );
};

export default Frame;
