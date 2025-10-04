import { Container } from '@/components/layout';
import { Icon } from '@/components/ui';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <Container className='max-w-full bg-gray-100'>
        <div className='mx-auto flex flex-wrap justify-between gap-10 px-5 py-8 desktop:w-[964px]'>
          <div className='order-3 flex-grow text-caption font-normal text-gray-500 tablet:order-1 tablet:flex-grow-0 tablet:text-body-m'>
            ©codeit - 2023
          </div>
          <div className='order-1 flex gap-[30px] font-normal text-gray-500'>
            <Link href={'/'} className='text-body-s hover:text-gray-700 tablet:text-body-m'>
              Privacy Policy
            </Link>
            <Link href={'/'} className='text-body-s hover:text-gray-700 tablet:text-body-m'>
              FAQ
            </Link>
          </div>

          <ul className='order-2 flex gap-[10px]'>
            <li className='hover:-translate-y-1'>
              <Link href='https://mail.google.com/' target='_blank'>
                <Icon iconName='envelope' ariaLabel='메일' className='bg-gray-400' />
              </Link>
            </li>
            <li className='hover:-translate-y-1'>
              <Link href='https://www.facebook.com/' target='_blank'>
                <Icon iconName='facebook' ariaLabel='페이스북' className='bg-gray-400' />
              </Link>
            </li>
            <li className='hover:-translate-y-1'>
              <Link href='https://www.instagram.com/' target='_blank'>
                <Icon iconName='instagram' ariaLabel='인스타그램' className='bg-gray-400' />
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
