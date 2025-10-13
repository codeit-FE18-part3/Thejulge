// 목적: 유저 리소스 전용(내 정보 조회/수정)
import axios from '@/lib/axios';
import type { User } from '@/types/user';

// 내 정보 조회: GET /users/{user_id}
export async function apiGetUser(userId: string) {
  const { data } = await axios.get<{ item: User }>(`/users/${userId}`);
  return data.item;
}

// 내 정보 수정: PUT /users/{user_id}
export async function apiUpdateUser(userId: string, patch: Partial<User>) {
  const { data } = await axios.put<{ item: User }>(`/users/${userId}`, patch);
  return data.item;
}
