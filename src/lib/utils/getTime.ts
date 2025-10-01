function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

export function getTime(startsAt: string, workhour: number) {
  const START = new Date(startsAt);
  const END = new Date(startsAt);

  END.setHours(END.getHours() + workhour);

  return { STRAT: formatDate(START), END: formatDate(END), duration: `${workhour}시간` };
}
