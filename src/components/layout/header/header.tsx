import { Container } from '@/components/layout';
import { cn } from '@/lib/utils/cn';
import Logo from './logo';
import Nav from './nav';
import SearchBar from './searchBar';
const Header = () => {
  return (
    <Container
      as={'header'}
      className={cn(
        'flex flex-wrap items-center justify-between gap-x-8 gap-y-4',
        'max-w-[1094px] py-[10px]',
        'tablet:flex-nowrap tablet:py-[15px]'
      )}
    >
      <Logo />
      <SearchBar />
      <Nav />
    </Container>
  );
};
export default Header;
