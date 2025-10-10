import Image from 'next/image';
import { noticeImageWrapper } from './notice.styles';

interface NoticeImageProps {
  name?: string;
  imageUrl?: string;
}
const NoticeImage = ({ name, imageUrl }: NoticeImageProps) => (
  <div className={noticeImageWrapper()}>
    <Image
      src={imageUrl ?? ''}
      alt={`${name} 가게 이미지`}
      fill
      sizes='(max-width: 744px) 630px, 540px'
      className='object-cover'
      priority
    />
  </div>
);
export default NoticeImage;
