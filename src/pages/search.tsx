import { NoticeListSection } from '@/components/features';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const Search = () => {
  const router = useRouter();
  const q = typeof router.query.q === 'string' ? router.query.q : '';
  const initialFilters = useMemo(() => (q ? { keyword: q } : undefined), [q]);
 
  return <NoticeListSection q={q} initialFilters={initialFilters} />;
};
export default Search;
