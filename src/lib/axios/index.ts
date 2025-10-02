import baseAxios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default axiosInstance;
