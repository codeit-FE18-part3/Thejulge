import { NoticeListSection } from '@/components/features';
import { NoticeProvider } from '@/context/noticeProvider';
import useAuth from '@/hooks/useAuth';
import { useMemo } from 'react';

export default function Main() {
  const { user } = useAuth();
  const recommendedAddress = user?.address ?? '';
  const initialFilters = useMemo(
    () => ({ limit: 3, address: [recommendedAddress] }),
    [recommendedAddress]
  );
  return (
    <>
      <NoticeProvider>
        <div className='bg-red-100'>
          <NoticeListSection title='맞춤 공고' showFilter={false} initialFilters={initialFilters} />
        </div>
      </NoticeProvider>
      <NoticeProvider>
        <NoticeListSection title='전체 공고' showFilter />;
      </NoticeProvider>
    </>
  );
}
