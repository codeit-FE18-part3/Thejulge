import { Icon } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';

const SearchBar = ({ initValue = '' }) => {
  const [keyword, setKeyword] = useState(initValue);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword) {
      router.push('/');
      return;
    }
    return router.push(`/search?q=${keyword}`);
  };

  return (
    <form
      className={cn('relative order-1 w-full grow', 'tablet:order-none')}
      onSubmit={handleSubmit}
    >
      <Icon
        iconName='search'
        iconSize='rg'
        className='absolute ml-3 mt-3 bg-gray-400'
        ariaLabel='검색'
      />
      <input
        type='text'
        id='shopSearchKeyWord'
        name='shopSearchKeyWord'
        value={keyword}
        onChange={handleChange}
        className={cn(
          'w-full rounded-xl bg-gray-100 p-3 pl-10 text-body-s',
          'focus:outline-red-300'
        )}
        placeholder='공고를 검색해보세요'
      />
    </form>
  );
};

export default SearchBar;
