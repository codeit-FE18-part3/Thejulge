import baseAxios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(config => {
  // SSR에서는 localStorage가 없으니 브라우저에서만 읽기
  const token = typeof window !== 'undefined' ? localStorage.getItem('thejulge_token') : null;
  if (token) {
    // Axios v1: headers가 AxiosHeaders(클래스)일 수 있음
    const h = config.headers as any;
    if (h?.set && typeof h.set === 'function') {
      // 1) AxiosHeaders 인스턴스인 경우: set API 지원
      h.set('Authorization', `Bearer ${token}`);
    } else {
      // 2) 평범한 객체인 경우: 속성만 추가 (전체 재할당 금지)
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;
