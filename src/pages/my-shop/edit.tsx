import { getShop, postPresignedUrl, putShop, uploadImage } from '@/api/employer';
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

  const handleEdit = async (editData: RegisterFormData) => {
    if (!user?.shop) return;
    let imageUrl = editData.image ? '' : null;
    if (editData?.image) {
      try {
        const presignedUrl = await postPresignedUrl(editData.image.name);
        await uploadImage(presignedUrl, editData.image);
        imageUrl = presignedUrl.split('?')[0];
      } catch (error) {
        alert(error);
      }
    }
    // 🟣 PUT 요청
    await putShop(user.shop.item.id, { ...editData, imageUrl });
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
