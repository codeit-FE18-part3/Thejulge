import { getShop, putShop, uploadImageAndGetUrl } from '@/api/employer';
import ShopForm from '@/components/features/my-shop/shopForm';
import { Header, Wrapper } from '@/components/layout';
import useAuth from '@/hooks/useAuth';
import { NextPageWithLayout } from '@/pages/_app';
import RegisterFormData from '@/types/myShop';
import { useEffect, useState } from 'react';

interface ImageData {
  name: string;
  file: File;
}

const Edit: NextPageWithLayout = () => {
  const { user } = useAuth();
  const [editData, setEditData] = useState<RegisterFormData | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    const fetchShop = async () => {
      if (user?.shop) {
        const res = await getShop(user.shop.item.id);
        setEditData(res.item);
      }
    };
    fetchShop();
  }, [user]);

  const handleEdit = async (formData: RegisterFormData) => {
    if (!user?.shop) return;

    if (editData?.image) {
      try {
        await uploadImageAndGetUrl(editData.image);
      } catch (error) {
        alert(error);
      }
    }

    // 🟣 PUT 요청
    await putShop(user.shop.item.id, formData);
  };
  return (
    <>
      <ShopForm mode='edit' initialData={editData} onSubmit={handleEdit} />
    </>
  );
};

Edit.getLayout = page => (
  <Wrapper>
    <Header />
    <main>{page}</main>
  </Wrapper>
);

export default Edit;
