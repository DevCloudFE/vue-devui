/** 判断是否是同一天 */
export const isSameDate = (date: Date, compareDate: Date): boolean => {
  return (
    date.getFullYear() === compareDate.getFullYear() &&
    date.getMonth() === compareDate.getMonth() &&
    date.getDate() === compareDate.getDate()
  );
};
