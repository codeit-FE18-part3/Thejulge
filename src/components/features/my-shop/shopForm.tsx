import RegisterAddress from '@/components/features/my-shop/registerAddress';
import RegisterDescription from '@/components/features/my-shop/registerDescription';
import RegisterImage from '@/components/features/my-shop/registerImage';
import RegisterModal from '@/components/features/my-shop/registerModal';
import RegisterName from '@/components/features/my-shop/registerName';
import RegisterWage from '@/components/features/my-shop/registerWage';
import { Container } from '@/components/layout';
import { Button, Icon } from '@/components/ui';
import RegisterFormData from '@/types/myShop';
import { ChangeEvent, useEffect, useState } from 'react';

interface ShopFromProps {
  mode: 'register' | 'edit';
  initialData?: RegisterFormData | null;
  onSubmit: (data: RegisterFormData) => Promise<void>;
}

const ShopForm = ({ mode, initialData, onSubmit }: ShopFromProps) => {
  const [formData, setFormData] = useState<RegisterFormData>(
    initialData || {
      name: '',
      category: undefined,
      address1: undefined,
      address2: '',
      originalHourlyPay: '',
      description: '',
      image: null,
      imageUrl: '',
    }
  );

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const [preview, setPreview] = useState<string | null>(null);
  const [openWarning, setOpenWarning] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openConfirm, setOepnConfirm] = useState(false);

  const handleChange = (key: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleWageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, '');
    if (!/^\d*$/.test(raw)) return;
    const formatted = raw ? Number(raw).toLocaleString() : '';
    setFormData(prev => ({ ...prev, originalHourlyPay: formatted }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData(prev => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const validateForm = () => {
    return (
      !formData.name ||
      !formData.category ||
      !formData.address1 ||
      !formData.address2 ||
      !formData.originalHourlyPay ||
      !formData.image
    );
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setOpenWarning(true);
      return;
    }
    setOepnConfirm(true);
    await onSubmit(formData);
  };
  return (
    <>
      <div className='h-auto bg-gray-50'>
        <Container as='section' className='flex flex-col gap-6 pb-20'>
          <div className='mt-6 flex items-center justify-between'>
            <h1 className='text-heading-l font-bold'>
              {mode === 'register' ? '가게 등록' : '가게 편집'}
            </h1>
            <button
              onClick={() => setOpenCancel(true)}
              className='flex cursor-pointer items-center justify-center'
            >
              <Icon iconName='close' iconSize='lg' ariaLabel='닫기' />
            </button>
          </div>
          <RegisterName formData={formData} handleChange={handleChange} />
          <RegisterAddress formData={formData} handleChange={handleChange} />
          <RegisterWage formData={formData} handleWageChange={handleWageChange} />
          <RegisterImage preview={preview} handleImageChange={handleImageChange} />
          <RegisterDescription formData={formData} handleChange={handleChange} />
          <Button onClick={handleSubmit}>{mode === 'register' ? '등록하기' : '완료하기'}</Button>
          <RegisterModal
            openWarning={openWarning}
            setOpenWarning={setOpenWarning}
            openCancel={openCancel}
            setOpenCancel={setOpenCancel}
            openConfirm={openConfirm}
            setOepnConfirm={setOepnConfirm}
          />
        </Container>
      </div>
    </>
  );
};
export default ShopForm;
