import axios from '@/lib/axios';
import RegisterFormData from '@/types/myShop';
import { default as originAxios } from 'axios';

export async function postShop(body: RegisterFormData) {
  const { address1, address2, category, description, name, originalHourlyPay, image } = body;

  const imageUrl = image
    ? `https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/${image.name}`
    : '';

  const tmpBody = {
    address1,
    address2,
    category,
    description,
    name,
    originalHourlyPay,
    imageUrl,
  };
  const { data } = await axios.post('/shops', tmpBody);
}

export async function postPresignedUrl(imageName: string) {
  const { data } = await axios.post('/images', { name: imageName });
  console.log(data);
  return data.item.url;
}

export async function uploadImage(presignedUrl: string, file: File) {
  const result = await originAxios.put(presignedUrl, file);
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

export async function getShop(shopId: string) {
  const { data } = await axios.get(`/shops/${shopId}`);
  return data;
}
