import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import { ApplicationItem, ApplicationListResponse } from '@/types/applications';

// 유저의 공고 지원 내역 전체 조회
export async function getAllUserApplications({
  userId,
  limit = 10,
}: {
  userId: string;
  limit?: number;
}) {
  const results: ApiResponse<ApplicationItem>[] = [];
  let offset = 0;
  let hasNext = true;

  while (hasNext) {
    const { data } = await axiosInstance.get<ApplicationListResponse>(
      `/users/${userId}/applications`,
      { params: { offset, limit } }
    );

    results.push(...data.items);
    hasNext = data.hasNext;
    offset += limit;
  }

  return results; // 모든 페이지 합쳐 반환
}

// 가게의 특정 공고 지원 등록
export const postApplication = async (shopId: string, noticeId: string) => {
  await axiosInstance.post(`/shops/${shopId}/notices/${noticeId}/applications`);
};

// 가게의 특정 공고 지원 취소
export const putApplication = async (shopId: string, noticeId: string, applicationId: string) => {
  await axiosInstance.put(`/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`, {
    status: 'canceled',
  });
};
