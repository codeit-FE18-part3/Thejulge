export const ADDRESS_CODE = [
  '서울시 강남구',
  '서울시 강동구',
  '서울시 강북구',
  '서울시 강서구',
  '서울시 관악구',
  '서울시 광진구',
  '서울시 구로구',
  '서울시 금천구',
  '서울시 노원구',
  '서울시 도봉구',
  '서울시 동대문구',
  '서울시 동작구',
  '서울시 마포구',
  '서울시 서대문구',
  '서울시 서초구',
  '서울시 성동구',
  '서울시 성북구',
  '서울시 송파구',
  '서울시 양천구',
  '서울시 영등포구',
  '서울시 용산구',
  '서울시 은평구',
  '서울시 종로구',
  '서울시 중구',
  '서울시 중랑구',
] as const;
export type AddressCode = (typeof ADDRESS_CODE)[number];

export const CATEGORY_CODE = [
  '한식',
  '중식',
  '일식',
  '양식',
  '분식',
  '카페',
  '편의점',
  '기타',
] as const;
export type CategoryCode = (typeof CATEGORY_CODE)[number];

export const SORT_CODE = ['마감 임박 순', '시급 많은 순', '시간 적은 순', '가나다 순'] as const;
export type SortCode = (typeof SORT_CODE)[number];
