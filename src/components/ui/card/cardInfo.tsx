import { Icon } from '@/components/ui/icon';
import { IconName } from '@/constants/icon';
import { ReactNode } from 'react';
import { cardLayout, CardStatusVariant } from './card.styles';

interface CardInfo {
  iconName: IconName;
  status?: CardStatusVariant;
  ariaLabel: string;
  children?: ReactNode;
}

const CardInfo = ({ iconName, ariaLabel, status, children }: CardInfo) => {
  return (
    <li className={cardLayout.infoLayout()}>
      <Icon
        iconName={iconName}
        iconSize='rg'
        ariaLabel={ariaLabel}
        className={cardLayout.infoIcon({ status: status })}
      />
      <p className={cardLayout.info({ status: status })}>{children}</p>
    </li>
  );
};

export default CardInfo;
