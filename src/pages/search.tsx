import NoticeListSection from '@/components/features/noticeList/noticeListSection';
import { NoticeProvider } from '@/context/noticeProvider';
import axiosInstance from '@/lib/axios';
import type { GetServerSideProps } from 'next';
import { useMemo } from 'react';

type SearchProps = {
  q: string;
};

export const getServerSideProps: GetServerSideProps<SearchProps> = async ({ query }) => {
  const q = query.q as string;
  if (!q) {
    return { props: { q: '' } };
  }

  try {
    await axiosInstance.get('/notices', { params: { keyword: q } });
    return { props: { q } };
  } catch {
    return { props: { q } };
  }
};

const Search = ({ q }: SearchProps) => {
  const initialFilters = useMemo(() => ({ keyword: q }), [q]);
  return (
    <NoticeProvider>
      <NoticeListSection q={q} showFilter initialFilters={initialFilters} />
    </NoticeProvider>
  );
};
export default Search;
