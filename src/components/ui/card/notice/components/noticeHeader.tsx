import { cardLayout } from '@/components/ui/card/card.styles';
import { noticeLabel } from '@/components/ui/card/notice/notice.styles';

interface NoticeHeaderProps {
  name?: string;
  category?: string;
  className?: string;
}
const NoticeHeader = ({ name, category, className }: NoticeHeaderProps) => (
  <div className={className}>
    <p className={noticeLabel()}>{category}</p>
    <h2 className={cardLayout.heading({ size: 'lg' })}>{name}</h2>
  </div>
);
export default NoticeHeader;
