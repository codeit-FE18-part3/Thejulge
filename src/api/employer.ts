import axios from '@/lib/axios';
import RegisterFormData from '@/types/myShop';
import { default as originAxios } from 'axios';

export async function postShop(body: RegisterFormData) {
  const accessToken = localStorage.getItem('thejulge-token');
  const { data } = await axios.post('/shops', body, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
}

export async function getShop(shopId: string) {
  const { data } = await axios.get(`/shops/${shopId}`);
  return data;
}

export async function putShop(shopId: string, body: RegisterFormData) {
  const accessToken = localStorage.getItem('thejulge-token');
  const { data } = await axios.put(`/shops/${shopId}`, body, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
}

///////////////////////////////////////////////////////////////////////////////

export async function postPresignedUrl(imageUrl: string) {
  const accessToken = localStorage.getItem('thejulge-token');
  const { data } = await axios.post(
    '/images',
    { name: imageUrl },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.item.url;
}

export async function uploadImage(presignedUrl: string, file: File) {
  try {
    const result = await originAxios.put(presignedUrl, file, {
      headers: { 'Content-Type': file.type },
    });
  } catch (error) {
    alert(error);
  }
}

export async function getPresignedUrl(presignedUrl: string) {
  // 1. URL 객체 생성
  const url = new URL(presignedUrl);

  // 2. 쿼리 파라미터를 제거 (URL 객체의 search 속성을 비움)
  url.search = '';

  // 3. 쿼리 파라미터가 제거된 새 URL 문자열을 얻습니다.
  const baseUrl = url.toString();

  const result = await originAxios.get(baseUrl);
}
