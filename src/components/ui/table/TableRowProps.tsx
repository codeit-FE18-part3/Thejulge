export type TableRowProps = {
  id: string;
  name: string;
  startsAt: string;
  workhour: number;
  hourlyPay: string;
  status: string | JSX.Element;
  bio: string;
  phone: string;
  userId?: string;
  shopId?: string;
  noticeId?: string;
};
