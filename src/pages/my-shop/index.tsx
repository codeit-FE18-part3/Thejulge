import { getShop } from '@/api/employer';
import { Frame } from '@/components/layout';
import { Button, Notice } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Myshop = () => {
  const { isLogin, user, role } = useAuth();
  const [shopData, setShopData] = useState({});
  console.log('user :', user);

  useEffect(() => {
    const get = async () => {
      if (user?.shop) {
        const res = await getShop(user.shop.item.id);
        console.log('shop:', res);
        const { description, ...rest } = res.item;
        const formattedShopData = { ...rest, shopDescription: description };
        setShopData(formattedShopData);
      }
    };
    get();
  }, [user]);

  return (
    <>
      {user?.shop ? (
        <>
          <Notice notice={shopData} variant='shop'>
            <div className='flex gap-2'>
              <Button
                as={Link}
                href='/'
                variant='secondary'
                className='h-[38px] flex-1 tablet:h-12'
              >
                편집하기
              </Button>
              <Button as={Link} href='/' className='h-[38px] flex-1 tablet:h-12'>
                공고 등록하기
              </Button>
            </div>
          </Notice>
          <Frame
            title='등록한 공고'
            content='공고를 등록해 보세요.'
            buttonText='공고 등록하기'
            href='/'
          />
        </>
      ) : (
        <Frame
          title='내 가게'
          content='내 가게를 소개하고 공고도 등록해 보세요.'
          buttonText='가게 등록하기'
          href='/my-shop/register'
        />
      )}
    </>
  );
};

export default Myshop;
