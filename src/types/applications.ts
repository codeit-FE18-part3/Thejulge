import { ApiItemsResponse, ApiResponse, PaginatedResponse } from './api';
import type { Notice } from './notice';
import type { Shop } from './shop';

export type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'canceled';
export interface ApplicationBase {
  item: {
    id: string;
    status: ApplicationStatus;
    createdAt: string;
  };
}

export interface ApplicationItem {
  id: string;
  status: ApplicationStatus;
  createdAt: string; // ISO 문자열
  shop: { item: Shop; href: string };
  notice: { item: Notice; href: string };
  user?: { id: string; name?: string; email?: string };
}

export type ApplicationListResponse = PaginatedResponse &
  ApiItemsResponse<ApiResponse<ApplicationItem>>;
