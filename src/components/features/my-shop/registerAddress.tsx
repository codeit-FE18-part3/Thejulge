import { Dropdown, Input } from '@/components/ui';
import { ADDRESS_CODE } from '@/constants/dropdown';
import RegisterFormData from '@/types/myShop';

interface Props {
  formData: RegisterFormData;
  handleChange: (key: keyof RegisterFormData, value: string) => void;
}

const RegisterAddress = ({ formData, handleChange }: Props) => {
  return (
    <>
      <div className='flex flex-col gap-6 tablet:flex-row'>
        <div className='flex flex-col gap-1 tablet:w-1/2'>
          <div>
            <span>주소</span>
            <span className='ml-0.5 text-red-500'>*</span>
          </div>
          <Dropdown
            name='staus'
            ariaLabel='어드레스'
            placeholder='선택'
            values={ADDRESS_CODE}
            selected={formData.address1}
            onChange={val => handleChange('address1', val)}
            className='w-full'
          />
        </div>
        <div className='flex flex-col gap-2 tablet:w-1/2'>
          <Input
            label='상세 주소'
            requiredMark
            value={formData.address2}
            onChange={e => handleChange('address2', e.target.value)}
            placeholder='입력'
          />
        </div>
      </div>
    </>
  );
};

export default RegisterAddress;
