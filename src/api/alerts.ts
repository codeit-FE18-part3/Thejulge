import axios from '@/lib/axios';
import type { ApiResponse, PaginatedResponse } from '@/types/api';
import type { Notice } from '@/types/notice';
import type { Shop } from '@/types/shop';

// 서버 응답에 맞춘 타입
export type AlertItem = {
  id: string;
  createdAt: string;
  result: 'accepted' | 'rejected';
  read: boolean;
  application: { item: { id: string; status: 'pending' | 'accepted' | 'rejected' } };
  shop: { item: Shop };
  notice: { item: Notice };
};

export async function getUserAlerts(userId: string, params?: { offset?: number; limit?: number }) {
  const { data } = await axios.get<PaginatedResponse & { items: ApiResponse<AlertItem>[] }>(
    `/users/${userId}/alerts`,
    { params }
  );
  return data;
}

export async function markAlertRead(userId: string, alertId: string) {
  // PUT /users/{user_id}/alerts/{alert_id} (Body 없이 호출해도 OK)
  const { data } = await axios.put<{ item: AlertItem }>(`/users/${userId}/alerts/${alertId}`);
  return data.item;
}
