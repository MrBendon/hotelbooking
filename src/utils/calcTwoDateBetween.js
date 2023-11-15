import { differenceInCalendarDays } from "date-fns";

export function calcTwoDateBetween(startDate, endDate) {
  const result = differenceInCalendarDays(startDate, endDate);

  return result;
}
