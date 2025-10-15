import { Dropdown, Input } from '@/components/ui';
import { CATEGORY_CODE } from '@/constants/dropdown';
import RegisterFormData from '@/types/myShop';

interface Props {
  formData: RegisterFormData;
  handleChange: (key: keyof RegisterFormData, value: string) => void;
}

const RegisterName = ({ formData, handleChange }: Props) => {
  return (
    <>
      <div className='flex flex-col gap-6 tablet:flex-row'>
        <div className='flex flex-col gap-2 tablet:w-1/2'>
          <Input
            label='가게 이름'
            requiredMark
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            placeholder='입력'
          />
        </div>
        <div className='flex flex-col gap-1 tablet:w-1/2'>
          <div>
            <span>분류</span>
            <span className='ml-0.5 text-red-500'>*</span>
          </div>
          <Dropdown
            name='staus'
            ariaLabel='카테고리'
            placeholder='선택'
            values={CATEGORY_CODE}
            selected={formData.category}
            onChange={val => handleChange('category', val)}
            className='w-full'
          />
        </div>
      </div>
    </>
  );
};

export default RegisterName;
