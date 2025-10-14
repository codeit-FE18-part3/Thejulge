import { Input } from '@/components/ui';
import RegisterFormData from '@/types/myShop';
import { ChangeEvent } from 'react';

interface Props {
  formData: RegisterFormData;
  handleWageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RegisterWage = ({ formData, handleWageChange }: Props) => {
  return (
    <>
      <div className='flex flex-col gap-6 tablet:flex-row'>
        <div className='flex flex-col gap-2 tablet:w-1/2'>
          <div>
            <span>기본 시급</span>
            <span className='ml-0.5 text-red-500'>*</span>
          </div>
          <Input
            placeholder='입력'
            suffix='원'
            value={formData.originalHourlyPay}
            onChange={handleWageChange}
          />
        </div>
        <div className='hidden tablet:block tablet:w-1/2'></div>
      </div>
    </>
  );
};

export default RegisterWage;
