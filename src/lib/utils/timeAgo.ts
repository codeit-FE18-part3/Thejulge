type timeUnit = { seconds: number; label: string };

const TIME_UNITS: timeUnit[] = [
  { seconds: 365 * 24 * 60 * 60, label: '년' },
  { seconds: 30 * 24 * 60 * 60, label: '개월' },
  { seconds: 24 * 60 * 60, label: '일' },
  { seconds: 60 * 60, label: '시간' },
  { seconds: 60, label: '분' },
];

export function timeAgo(dateString: string): string {
  const NOW = new Date();
  const DATE = new Date(dateString);

  const DIFF_SECONDS = Math.floor((NOW.getTime() - DATE.getTime()) / 1000);

  for (const UNIT of TIME_UNITS) {
    const INTERVAL = Math.floor(DIFF_SECONDS / UNIT.seconds);
    if (INTERVAL >= 1) {
      return `${INTERVAL}${UNIT.label} 전`;
    }
  }
  return '방금 전';
}
