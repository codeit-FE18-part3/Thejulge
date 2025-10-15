import { Icon } from '@/components/ui';
import Image from 'next/image';
import { ChangeEvent } from 'react';

interface Props {
  preview: string | null;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RegisterImage = ({ preview, handleImageChange }: Props) => {
  return (
    <>
      <div className='flex flex-col gap-1'>
        <div>
          <span>가게 이미지</span>
          <span className='ml-0.5 text-red-500'>*</span>
        </div>
        <label className='relative flex h-[200px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-gray-300 tablet:h-[276px] tablet:w-[483px]'>
          {preview ? (
            <Image src={preview} alt='미리보기' fill />
          ) : (
            <>
              <Icon
                iconName='camera'
                iconSize='lg'
                ariaLabel='카메라 아이콘'
                className='bg-gray-400'
              />
              <p className='text-gray-400'>이미지 추가하기</p>
            </>
          )}
          <input type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
        </label>
      </div>
    </>
  );
};

export default RegisterImage;
