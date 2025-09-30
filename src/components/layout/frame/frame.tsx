interface FrameProps {
  title: string;
  content: string;
}

const Frame = ({ title, content }: FrameProps) => {
  return (
    <>
      <section className='flex flex-col gap-4 px-3 py-10 tablet:px-8 tablet:py-[60px] desktop:px-[237px] desktop:py-[60px]'>
        <h1 className='text-xl font-bold tablet:text-[28px]'>{title}</h1>
        <div className='flex flex-col items-center justify-center gap-4 rounded-xl border border-solid border-gray-200 px-6 py-[60px]'>
          <h2 className='text-sm font-normal tablet:text-base'>{content}</h2>
          {/*  버튼 컴포넌트 넣을 자리 */}
        </div>
      </section>
    </>
  );
};

export default Frame;
