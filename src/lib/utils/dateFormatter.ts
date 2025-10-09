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

export function formatWithDots(numbers: string) {
  const year = numbers.slice(0, 4);
  const month = numbers.slice(4, 6);
  const day = numbers.slice(6, 8);

  if (month && day) return `${year}.${month}.${day}`;
  if (month) return `${year}.${month}`;
  if (year) return `${year}`;
  return numbers;
}
