export const getDaysInMonth = (year: number, month: number) => {
  const startDays = new Date(year, month, 1);
  const endDays = new Date(year, month + 1, 0);
  const days = [];

  // 해당 월 첫 주 빈칸 채우기
  for (let i = 0; i < startDays.getDay(); i++) {
    days.push(null);
  }

  // 해당 월 날짜 채우기
  for (let d = 1; d <= endDays.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  return days;
};
