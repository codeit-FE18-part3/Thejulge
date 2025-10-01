import { User } from './user';

/* -------------------- 공통 타입 -------------------- */
export interface Link {
  rel: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  href: string;
}

export interface PaginatedResponse<T> {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: T[];
  links: Link[];
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
