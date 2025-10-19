import { FilterQuery } from '@/types/api';

export function getActiveFilterCount(q: FilterQuery): number {
  const addressCount = q.address ? q.address.length : 0;
  const dateCount = q.startsAtGte ? 1 : 0;
  const payCount = typeof q.hourlyPayGte === 'number' ? 1 : 0;

  return addressCount + dateCount + payCount;
}
