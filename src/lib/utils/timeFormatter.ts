export function formatTimeInputValue(value: string) {
  if (value.length <= 2) return value;
  const h = value.slice(0, value.length - 2);
  const m = value.slice(-2);
  return `${h}:${m}`;
}
