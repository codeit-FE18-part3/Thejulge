import envelopeIcon from '@/assets/icon/ic-envelope.svg';
import facebookIcon from '@/assets/icon/ic-facebook.svg';
import instagramIcon from '@/assets/icon/ic-instagram.svg';
import { Container } from '@/components/layout';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <Container as={'footer'} className='max-w-full bg-gray-100'>
      <div className='mx-auto flex flex-wrap justify-between gap-10 px-5 py-8 desktop:w-[964px]'>
        <div className='order-3 flex-grow text-caption font-normal text-gray-500 tablet:order-1 tablet:flex-grow-0 tablet:text-body-m'>
          ©codeit - 2023
        </div>
        <div className='order-1 flex gap-[30px] font-normal text-gray-500'>
          <Link href={'/'} className='text-body-s hover:text-gray-300 tablet:text-body-m'>
            Privacy Policy
          </Link>
          <Link href={'/'} className='text-body-s hover:text-gray-300 tablet:text-body-m'>
            FAQ
          </Link>
        </div>

        <ul className='order-2 flex gap-[10px]'>
          <li className='hover:-translate-y-1'>
            <a href='https://mail.google.com/' target='_blank'>
              <Image src={envelopeIcon} alt='메일' width={25} height={25} />
            </a>
          </li>
          <li className='hover:-translate-y-1'>
            <a href='https://www.facebook.com/' target='_blank'>
              <Image src={facebookIcon} alt='메일' width={25} height={25} />
            </a>
          </li>
          <li className='hover:-translate-y-1'>
            <a href='https://www.instagram.com/' target='_blank'>
              <Image src={instagramIcon} alt='인스타그램' width={25} height={25} />
            </a>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default Footer;
