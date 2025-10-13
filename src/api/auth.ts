// 목적: 로그인/회원가입 API만 담당(다른 리소스와 분리)
import axios from '@/lib/axios';
import type { LoginRequest, LoginResponse, UserRequest } from '@/types/user';

// 로그인: POST /token
export async function apiLogin(body: LoginRequest) {
  const { data } = await axios.post<LoginResponse>('/token', body);
  return data; // data.item.token, data.item.user.item.id 사용
}

// 회원가입: POST /users (알바생이면 type: 'employee')
export async function apiSignup(body: UserRequest) {
  const { data } = await axios.post('/users', body);
  return data;
}
