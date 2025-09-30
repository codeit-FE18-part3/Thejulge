import baseAxios from 'axios';

const axiosInstance = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
export default axiosInstance;
