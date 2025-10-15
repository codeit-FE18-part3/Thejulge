import RegisterFormData from '@/types/myShop';

interface Props {
  formData: RegisterFormData;
  handleChange: (key: keyof RegisterFormData, value: string) => void;
}

const RegisterDescription = ({ formData, handleChange }: Props) => {
  return (
    <>
      <div className='flex flex-col gap-1'>
        <span>가게 설명</span>
        <textarea
          value={formData.description}
          placeholder='입력'
          className={'base-input h-[153px] resize-none'}
          onChange={e => handleChange('description', e.target.value)}
        ></textarea>
      </div>
    </>
  );
};

export default RegisterDescription;
