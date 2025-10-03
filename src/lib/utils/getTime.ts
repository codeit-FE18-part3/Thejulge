function formatDate(date: Date): string {
  const YEAR = date.getFullYear();
  const MONTH = String(date.getMonth() + 1).padStart(2, '0');
  const DAY = String(date.getDate()).padStart(2, '0');

  return `${YEAR}.${MONTH}.${DAY}`;
}

function formatTime(date: Date): string {
  const HOURS = String(date.getHours()).padStart(2, '0');
  const MINUTES = String(date.getMinutes()).padStart(2, '0');

  return `${HOURS}:${MINUTES}`;
}

export function getTime(startsAt: string, workhour: number) {
  const START_DATE = new Date(startsAt);
  const END_DATE = new Date(startsAt);

  END_DATE.setHours(END_DATE.getHours() + workhour);

  return {
    DATE: formatDate(START_DATE),
    START_TIME: formatTime(START_DATE),
    END_TIME: formatTime(END_DATE),
    DURATION: `${workhour}시간`,
  };
}
