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

// 저는 이거 써야 로그인이 되어서...
/*
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE,
});


// 로그인: POST /token
export async function apiLogin(body: LoginRequest) {
  const { data } = await apiClient.post<LoginResponse>('/token', body);
  return data; // data.item.token, data.item.user.item.id 사용
}

// 회원가입: POST /users (알바생이면 type: 'employee')
export async function apiSignup(body: UserRequest) {
  const { data } = await apiClient.post('/users', body);
  return data;
}
  */
