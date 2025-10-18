import { Modal } from '@/components/ui';
import { useRouter } from 'next/router';

interface Props {
  guestRedirect: boolean;
  setGuestRedirect: (value: boolean) => void;
  employeeRedirect: boolean;
  setEmployeeRedirect: (value: boolean) => void;
}

const IndexModal = ({
  guestRedirect,
  setGuestRedirect,
  employeeRedirect,
  setEmployeeRedirect,
}: Props) => {
  const router = useRouter();
  return (
    <>
      <Modal
        open={guestRedirect}
        onClose={() => setGuestRedirect(false)}
        variant='warning'
        title='로그인이 필요합니다.'
        primaryText='확인'
        onPrimary={() => {
          setGuestRedirect(false);
          router.push('/login');
        }}
      />
      <Modal
        open={employeeRedirect}
        onClose={() => setEmployeeRedirect(false)}
        variant='warning'
        title='접근권한이 없습니다.'
        primaryText='확인'
        onPrimary={() => {
          setEmployeeRedirect(false);
          router.push('/');
        }}
      />
    </>
  );
};

export default IndexModal;
