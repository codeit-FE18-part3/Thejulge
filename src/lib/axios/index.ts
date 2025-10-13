import axios, { AxiosHeaders, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: new AxiosHeaders({ 'Content-Type': 'application/json' }), // 타입 안전
});

//     "토큰을 붙이지 않을" 요청인지 판단
//    - 쿼리스트링이 있어도 경로 부분만 비교한다.
function isAuthFree(config: InternalAxiosRequestConfig) {
  const method = (config.method || 'get').toLowerCase();
  const url = String(config.url || '');
  const pathOnly = url.split('?')[0]; // '/token?x=1' → '/token'
  const isLoginOrSignup = pathOnly.endsWith('/token') || pathOnly.endsWith('/users');
  return method === 'post' && isLoginOrSignup;
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // 브라우저가 아니면(SSR) 스킵
  if (typeof window === 'undefined') return config;

  // 로그인/회원가입 요청이면 스킵
  if (isAuthFree(config)) return config;

  // localStorage에서 토큰을 읽어 Authorization에 붙이기
  const token = localStorage.getItem('thejulge_token');
  if (token) {
    // headers는 AxiosHeaders 타입이므로 set()을 안전하게 쓸 수 있다.
    (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
  }
  return config;
});

export default api;
