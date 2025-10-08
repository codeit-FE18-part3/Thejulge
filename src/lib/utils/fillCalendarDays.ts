export const fillCalendarDays = (year: number, month: number) => {
  const days: Date[] = [];

  const firstDayOfMonth = new Date(year, month, 1);
  const fisrtDay = firstDayOfMonth.getDay(); // 첫 날 요일
  const prevLastDate = new Date(year, month, 0); // 마지막 날짜 (month: 0 -> 12/31, 1 -> 1/31...)
  const prevMonthLast = prevLastDate.getDate(); // 마지막달 일자

  // 이전 달 날짜 채우기(일요일 시작 달력 기준)
  // ex) 만약 firstDay = 2(화요일) / prevMonthLast = 30
  // => 지난 달 날짜 2번(일, 월)
  // 30 - 2 + 1 + i -> 29, 30 채워 넣음
  for (let i = 0; i < fisrtDay; i++) {
    days.push(new Date(year, month - 1, prevMonthLast - fisrtDay + 1 + i));
  }

  // 이번 달 날짜 채우기
  const lastDate = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= lastDate; i++) {
    days.push(new Date(year, month, i));
  }

  // 다음 달 날짜 채우기
  const totalCells = Math.ceil(days.length / 7) * 7;
  const nextMonthDayCount = totalCells - days.length;
  for (let i = 1; i <= nextMonthDayCount; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
};
