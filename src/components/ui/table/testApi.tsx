export type UserType = 'employer' | 'employee';

export const fetchTableData = async (userType: UserType) => {
  return new Promise<{ headers: string[]; data: unknown[] }>(resolve => {
    setTimeout(() => {
      if (userType === 'employer') {
        resolve({
          headers: ['신청자', '소개', '전화번호', '상태'],
          data: [
            {
              name: '김강현',
              bio: '최선을 다해 열심히 일합니다. 다수의 업무 경험을 바탕으로 확실한 일처리 보여드리겠습니다.',
              phone: '010-1234-5678',
              status: '버튼',
            },
            {
              name: '서혜진',
              bio: '열심히 하겠습니다!',
              phone: '010-0000-0000',
              status: 'rejected',
            },
            {
              name: '주진혁',
              bio: '성실한 자세로 열심히 일합니다.',
              phone: '010-0000-0000',
              status: 'accepted',
            },
            {
              name: '장민혁',
              bio: '일을 꼼꼼하게 하는 성격입니다.',
              phone: '010-0000-0000',
              status: 'accepted',
            },
            {
              name: '고기훈',
              bio: '하루라도 최선을 다해서 일하겠습니다!',
              phone: '010-0000-0000',
              status: 'accepted',
            },
          ],
        });
      } else {
        resolve({
          headers: ['가게', '일자', '시급', '상태'],
          data: [
            {
              name: '너구리네 라면집',
              startsAt: '2025-10-01T11:00',
              workhour: 2,
              hourlyPay: '12,500원',
              status: 'accepted',
            },
            {
              name: '너구리네 라면집',
              startsAt: '2025-10-01T11:00',
              workhour: 2,
              hourlyPay: '12,500원',
              status: 'rejected',
            },
            {
              name: '너구리네 라면집',
              startsAt: '2025-10-01T11:00',
              workhour: 2,
              hourlyPay: '12,500원',
              status: 'accepted',
            },
            {
              name: '너구리네 라면집',
              startsAt: '2025-10-01T11:00',
              workhour: 2,
              hourlyPay: '12,500원',
              status: 'accepted',
            },
            {
              name: '너구리네 라면집',
              startsAt: '2025-10-01T11:00',
              workhour: 2,
              hourlyPay: '12,500원',
              status: 'accepted',
            },
          ],
        });
      }
    });
  });
};
