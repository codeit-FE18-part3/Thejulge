export type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'canceled';
export interface ApplicationBase {
  item: {
    id: string;
    status: ApplicationStatus;
    createdAt: string;
  };
}
