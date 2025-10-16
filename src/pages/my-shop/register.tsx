import { postPresignedUrl, postShop, uploadImage } from '@/api/employer';
import ShopForm from '@/components/features/my-shop/shopForm';
import { Header, Wrapper } from '@/components/layout';
import { NextPageWithLayout } from '@/pages/_app';
import RegisterFormData from '@/types/myShop';

const Register: NextPageWithLayout = () => {
  const handleRegister = async (formData: RegisterFormData) => {
    let imageUrl = formData.imageUrl ?? '';
    if (!imageUrl && formData.image instanceof File) {
      const presignedUrl = await postPresignedUrl(formData.image.name);
      await uploadImage(presignedUrl, formData.image);
      try {
        const url = new URL(presignedUrl);
        const shortUrl = url.origin + url.pathname;
        imageUrl = shortUrl;
      } catch (error) {
        alert(error);
      }
    }
    const { originalHourlyPay, ...shopData } = formData;
    const numericPay =
      typeof originalHourlyPay === 'string'
        ? Number(originalHourlyPay.replace(/,/g, ''))
        : originalHourlyPay;
    await postShop({ ...shopData, originalHourlyPay: numericPay, imageUrl });
  };
  return (
    <>
      <ShopForm mode='register' onSubmit={handleRegister} />
    </>
  );
};

Register.getLayout = page => (
  <Wrapper>
    <Header />
    <main>{page}</main>
  </Wrapper>
);

export default Register;
