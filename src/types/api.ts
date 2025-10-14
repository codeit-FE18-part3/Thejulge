import { User } from './user';

/* -------------------- 공통 타입 -------------------- */
export interface Link {
  rel: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  href: string;
}

export interface PaginatedResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
}
export interface ApiResponse<T> {
  item: T;
  links: Link[];
}

export interface ApiError {
  message: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: { item: User; href: string };
}

export type sort = 'time' | 'pay' | 'hour' | 'shop' | undefined;
export interface FilterQuery {
  address?: string[];
  startsAtGte?: string;
  hourlyPayGte?: number;
}

export interface NoticeQuery extends FilterQuery {
  offset?: number;
  limit?: number;
  keyword?: string;
  sort?: sort;
}
  