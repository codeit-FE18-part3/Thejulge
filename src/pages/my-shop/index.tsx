import { getNotice, getShop } from '@/api/employer';
import { Frame } from '@/components/layout';
import { Button, Notice } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Myshop = () => {
  const { user } = useAuth();
  const [shopData, setShopData] = useState({});
  const [shopNotice, setShopNotice] = useState({});

  useEffect(() => {
    const get = async () => {
      if (!user?.shop) return;
      try {
        const [shopRes, noticeRes] = await Promise.all([
          getShop(user.shop.item.id),
          getNotice(user.shop.item.id, { offset: 0, limit: 6 }),
        ]);

        const { description, ...rest } = shopRes.item;
        const formattedShopData = { ...rest, shopDescription: description };
        setShopData(formattedShopData);
        setShopNotice(noticeRes);
        //console.log('공고 조회:', noticeRes);
      } catch (error) {
        alert(error);
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
                href='/my-shop/edit'
                variant='secondary'
                className='h-[38px] flex-1 tablet:h-12'
              >
                편집하기
              </Button>
              <Button
                as={Link}
                href={`/employer/shops/${user.shop.item.id}/notices/register`}
                className='h-[38px] flex-1 tablet:h-12'
              >
                공고 등록하기
              </Button>
            </div>
          </Notice>
          <Frame
            title='등록한 공고'
            content='공고를 등록해 보세요.'
            buttonText='공고 등록하기'
            href='/employer/shops/${user.shop.item.id}/notices/register'
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
