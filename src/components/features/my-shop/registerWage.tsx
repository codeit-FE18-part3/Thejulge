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
        <div className='flex flex-col gap-1 tablet:w-1/2'>
          <Input
            label='기본 시급'
            requiredMark
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
