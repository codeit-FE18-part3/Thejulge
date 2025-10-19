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
export type UserRole = UserType | 'guest';
export interface UserBase {
  id: string;
  email: string;
  type: UserType;
}
export interface UserProfile {
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
}
export type User = UserBase &
  UserProfile & {
    shop?: { item: Shop } | null;
  };
