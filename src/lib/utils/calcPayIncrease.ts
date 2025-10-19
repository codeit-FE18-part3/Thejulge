export const calcPayIncreasePercent = (hourlyPay: number, originalHourlyPay: number) => {
  if (!originalHourlyPay) return null;
  const percent = Math.floor(((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100);

  return percent > 0 ? percent : null;
};
