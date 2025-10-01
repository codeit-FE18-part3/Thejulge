import { ApiResponse, AuthRequest, AuthResponse } from './api';
import { Shop } from './shop';

/* -------------------- 로그인 -------------------- */

export type LoginRequest = AuthRequest;

export type LoginResponse = ApiResponse<AuthResponse>;

/* ------------------- 회원가입 ------------------ */

export type UserRequest = AuthRequest & {
  type: UserType;
};

export type UserResponse = ApiResponse<UserBase>;

/* -------------------- 유저 -------------------- */
export type UserType = 'employer' | 'employee';

export interface UserBase {
  id: string;
  email: string;
  type: UserType;
}
export interface User extends UserBase {
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  shop?: { item: Shop } | null;
}
