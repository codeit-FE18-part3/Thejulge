import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import { ApplicationItem, ApplicationListResponse } from '@/types/applications';
import { NoticeCard } from '@/types/notice';

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

// 특정 가게 특정 공고 정보
export async function getNoticeById(shopId: string, noticeId: string): Promise<NoticeCard> {
  const { data } = await axiosInstance.get<NoticeCard>(`/shops/${shopId}/notices/${noticeId}`);
  return data;
}

// 특정 가게 특정 공고 지원자 목록
export async function getApplications(
  shopId: string,
  noticeId: string,
  offset = 0,
  limit = 5
): Promise<ApplicationItem[]> {
  const { data } = await axiosInstance.get<ApplicationListResponse>(
    `/shops/${shopId}/notices/${noticeId}/applications`,
    { params: { offset, limit } }
  );
  const applications: ApplicationItem[] = data.items.map(resp => resp.item);

  return applications;
}
