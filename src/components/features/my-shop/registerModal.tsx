import { Modal } from '@/components/ui';
import { useRouter } from 'next/router';

interface Props {
  mode: string;
  openWarning: boolean;
  setOpenWarning: (value: boolean) => void;
  openCancel: boolean;
  setOpenCancel: (value: boolean) => void;
  openConfirm: boolean;
  setOepnConfirm: (value: boolean) => void;
}

const RegisterModal = ({
  mode,
  openWarning,
  setOpenWarning,
  openCancel,
  setOpenCancel,
  openConfirm,
  setOepnConfirm,
}: Props) => {
  const router = useRouter();
  return (
    <>
      <Modal
        open={openWarning}
        onClose={() => setOpenWarning(false)}
        variant='warning'
        title='필수 항목을 작성해주세요.'
        primaryText='확인'
        onPrimary={() => setOpenWarning(false)}
      />
      <Modal
        open={openCancel}
        onClose={() => setOpenCancel(false)}
        variant='warning'
        title='취소하시겠습니까?'
        primaryText='아니요'
        secondaryText='예'
        onSecondary={() => {
          setOpenCancel(false);
          router.push('/my-shop');
        }}
        onPrimary={() => setOpenCancel(false)}
      />
      <Modal
        open={openConfirm}
        onClose={() => setOepnConfirm(false)}
        variant='success'
        title={mode === 'edit' ? '수정이 완료되었습니다.' : '등록이 완료되었습니다.'}
        primaryText='확인'
        onPrimary={() => router.push('/my-shop')}
      />
    </>
  );
};

export default RegisterModal;
