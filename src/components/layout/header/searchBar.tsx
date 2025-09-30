import { Icon } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

const SearchBar = () => {
  return (
    <div className={cn('relative order-1 w-full grow', 'tablet:order-none')}>
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
        className={cn(
          'w-full rounded-xl bg-gray-100 p-3 pl-10 text-body-s',
          'focus:outline-red-300'
        )}
        placeholder='가게 이름으로 찾아보세요 '
      />
    </div>
  );
};

export default SearchBar;
