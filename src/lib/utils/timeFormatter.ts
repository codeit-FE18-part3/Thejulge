export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}

export function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

// 문자열 -> DATE 변환
export function parsedDateTime(value: string): Date | null {
  const ISO_STRING = value.replace(' ', 'T');
  const DATE = new Date(ISO_STRING);
  return isNaN(DATE.getTime()) ? null : DATE;
}

// DATE -> 'YYYY-MM-DD HH:mm' 변환
export function formatDateTime(date: Date | null): string {
  return date ? `${formatDate(date)} ${formatTime(date)}` : '';
}

export function getTime(startsAt: string, workhour: number) {
  const startDate = new Date(startsAt);
  const endDate = new Date(startsAt);

  endDate.setHours(endDate.getHours() + workhour);

  return {
    date: formatDate(startDate),
    startTime: formatTime(startDate),
    endTime: formatTime(endDate),
    duration: `${workhour}시간`,
  };
}
