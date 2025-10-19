import { StatusBadge } from '@/components/ui/badge';
import { StatusType } from '@/components/ui/badge/StatusBadge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { TableRowProps } from '@/components/ui/table/TableRowProps';
import axiosInstance from '@/lib/axios';
import { cn } from '@/lib/utils/cn';
import { getTime } from '@/lib/utils/dateFormatter';
import { UserRole } from '@/types/user';
import { useState } from 'react';

interface TableTypeVariant {
  rowData: TableRowProps;
  userRole: UserRole;
  onStatusUpdate: (id: string, newStatus: StatusType) => void;
  shopId?: string;
  noticeId?: string;
}

const TD_BASE = 'border-b border-r px-3 py-5 text-base gap-3 md:border-r-0';
const TD_STATUS = 'border-b px-2 py-[9px]';

export default function TableRow({ rowData, userRole, onStatusUpdate }: TableTypeVariant) {
  const { date, startTime, endTime, duration } = getTime(rowData.startsAt, rowData.workhour);
  const [status, setStatus] = useState<StatusType>(rowData.status as StatusType);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<StatusType | null>(null);

  const handleClick = (action: StatusType) => {
    setModalAction(action);
    setModalOpen(true);
  };

  if (!rowData.shopId || !rowData.noticeId) {
    alert('잘못된 신청 정보입니다.');
    return;
  }

  const handleStatusChange = async () => {
    if (!modalAction) return;

    try {
      await axiosInstance.put(
        `/shops/${rowData.shopId}/notices/${rowData.noticeId}/applications/${rowData.id}`,
        { status: modalAction }
      );

      setStatus(modalAction);

      onStatusUpdate(rowData.id, modalAction);
    } catch (error) {
      alert(error instanceof Error ? error.message : '상태 변경 실패');
    } finally {
      setModalOpen(false);
      setModalAction(null);
    }
  };

  return (
    <>
      <tr className='text-left'>
        <td className={cn(TD_BASE, 'sticky left-0 z-10 bg-white')}>{rowData.name}</td>

        {userRole === 'employee' ? (
          <>
            <td className={TD_BASE}>{`${date} ${startTime} ~ ${date} ${endTime} (${duration})`}</td>
            <td className={TD_BASE}>{rowData.hourlyPay}</td>
          </>
        ) : (
          <>
            <td className={TD_BASE}>{rowData.bio}</td>
            <td className={TD_BASE}>{rowData.phone}</td>
          </>
        )}

        <td className={TD_STATUS}>
          {status === 'pending' && userRole === 'employer' ? (
            <div className='flex gap-2'>
              <Button
                variant='reject'
                size='md'
                className='whitespace-nowrap'
                onClick={() => handleClick('rejected')}
              >
                거절하기
              </Button>
              <Button
                variant='approve'
                size='md'
                className='whitespace-nowrap'
                onClick={() => handleClick('accepted')}
              >
                승인하기
              </Button>
            </div>
          ) : (
            <StatusBadge status={status} />
          )}
        </td>
      </tr>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        variant='warning'
        title={`신청을 ${modalAction === 'accepted' ? '승인' : '거절'}하시겠어요?`}
        primaryText='확인'
        secondaryText='취소'
        onPrimary={handleStatusChange}
        onSecondary={() => setModalOpen(false)}
      />
    </>
  );
}
