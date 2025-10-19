import { getNotice, getShop } from '@/api/employer';
import IndexModal from '@/components/features/my-shop/indexModal';
import { Container, Frame } from '@/components/layout';
import { Button, Notice, Post } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import { NoticeItem, NoticeResponse, ShopItem } from '@/types/myShop';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

const Myshop = () => {
  const { user, bootstrapped } = useAuth();
  const [shopData, setShopData] = useState<ShopItem>({
    id: '',
    name: '',
    category: '',
    address1: '',
    imageUrl: '',
    originalHourlyPay: 0,
    description: '',
  });
  const [shopNotice, setShopNotice] = useState<NoticeItem[]>([]);
  const [nextOffset, setNextOffset] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);
  const [guestRedirect, setGuestRedirect] = useState(false);
  const [employeeRedirect, setEmployeeRedirect] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bootstrapped) return;
    if (user === null) {
      setGuestRedirect(true);
      return;
    }
    if (user?.type === 'employee') {
      setEmployeeRedirect(true);
      return;
    }
  }, [user, bootstrapped]);

  useEffect(() => {
    if (!user?.shop) return;
    const shopId = user.shop.item.id;

    const get = async () => {
      try {
        const shopRes = await getShop(shopId);
        const { description, ...rest } = shopRes.item;
        setShopData({ ...rest, shopDescription: description });
        await loadMoreNotice(true);
      } catch (error) {
        alert(error);
      }
    };
    get();
  }, [user]);

  const loadMoreNotice = useCallback(
    async (isInitial: boolean = false) => {
      if (!user?.shop || nextOffset === null || loading) return;
      setLoading(true);
      try {
        const noticeRes: NoticeResponse = await getNotice(user.shop.item.id, {
          offset: nextOffset,
          limit: 6,
        });
        setShopNotice(prevShopNotice => {
          const newItems = noticeRes.items.map(i => i.item);
          const merged = [...prevShopNotice, ...newItems];
          const unique = merged.filter(
            (item, index, self) => index === self.findIndex(i => i.id === item.id)
          );
          return unique;
        });
        setNextOffset(
          noticeRes.hasNext
            ? isInitial
              ? noticeRes.items.length
              : nextOffset + noticeRes.items.length
            : null
        );
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    },
    [user?.shop, nextOffset, loading]
  );

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreNotice();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMoreNotice]);

  return (
    <>
      <IndexModal
        guestRedirect={guestRedirect}
        setGuestRedirect={setGuestRedirect}
        employeeRedirect={employeeRedirect}
        setEmployeeRedirect={setEmployeeRedirect}
      />
      {!user?.shop ? (
        <Frame
          title='내 가게'
          content='내 가게를 소개하고 공고도 등록해 보세요.'
          buttonText='가게 등록하기'
          href='/my-shop/register'
        />
      ) : (
        <>
          <Notice notice={shopData} variant='shop' className='mt-5 tablet:mt-8'>
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
          <section className='mt-10 max-w-full bg-gray-100 tablet:mt-20'>
            {shopNotice.length > 0 ? (
              <Container as='section' isPage className='pt-0'>
                <div className='mt-7 tablet:mt-0'>
                  <h2 className='mb-4 text-heading-l font-bold tablet:mb-8'>내가 등록한 공고</h2>
                  <div className='grid grid-cols-2 gap-x-4 gap-y-8 desktop:grid-cols-3'>
                    {shopNotice.map(item => {
                      const mergedNotice = {
                        ...item,
                        imageUrl: shopData.imageUrl,
                        name: shopData.name,
                        address1: shopData.address1,
                        shopId: shopData.id,
                        originalHourlyPay: shopData.originalHourlyPay,
                      };
                      return (
                        <Post
                          href={`employer/shops/${shopData.id}/notices/${item.id}`}
                          key={item.id}
                          notice={mergedNotice}
                        />
                      );
                    })}
                  </div>
                  <div ref={observerRef} className='flex h-12 items-center justify-center'>
                    {loading && <p className='text-gray-500'>불러오는 중...</p>}
                  </div>
                </div>
              </Container>
            ) : (
              <Frame
                title='등록한 공고'
                content='공고를 등록해 보세요.'
                buttonText='공고 등록하기'
                href={`/employer/shops/${user.shop.item.id}/notices/register`}
              />
            )}
          </section>
        </>
      )}
    </>
  );
};

export default Myshop;
