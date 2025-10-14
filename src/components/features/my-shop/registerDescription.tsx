import RegisterFormData from '@/types/myShop';

interface Props {
  formData: RegisterFormData;
  handleChange: (key: keyof RegisterFormData, value: string) => void;
}

const RegisterDescription = ({ formData, handleChange }: Props) => {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <span>가게 설명</span>
        <textarea
          value={formData.description}
          placeholder='입력'
          className='h-[153px] resize-none rounded-md border border-gray-300 px-5 py-4'
          onChange={e => handleChange('description', e.target.value)}
        ></textarea>
      </div>
    </>
  );
};

export default RegisterDescription;
