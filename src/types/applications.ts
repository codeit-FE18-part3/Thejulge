import { ApiItemsResponse, ApiResponse, PaginatedResponse } from './api';
import type { Notice, NoticeCard } from './notice';
import type { Shop } from './shop';
import { UserProfile } from './user';

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
  user?: { id: string; name?: string; email?: string; bio?: string; phone?: string };
}

export type ApplicationListResponse = PaginatedResponse &
  ApiItemsResponse<ApiResponse<ApplicationItem>>;

export type ApplicationTableDataItem = {
  id: string;
  status: string;
  shop: { item: Shop; href: string };
  notice: { item: NoticeCard; href: string };
  user: { item: UserProfile; href: string };
};
