import { format } from "date-fns";

const max = 10000000000000;
const min = 1;
export function getRandomString() {
  return parseInt(Math.random() * (max - min) + min).toString(36);
}

export function getRandom() {
  return parseInt(Math.random() * (max - min) + min);
}

export function getRandomNumberByDateNow() {
  return Date.now().toString(36);
}

export function getToday() {
  const date = format(Date.now(), "yyyy-MM-dd");
  return date;
}

export function DescByStartDate(array = []) {
  const resultArray = array.sort(function (a, b) {
    const bookingA = new Date(a.startDate);
    const bookingB = new Date(b.startDate);
    return bookingB - bookingA;
  });
  return resultArray;
}

export function DescIsDoneByBoolean(array = []) {
  const resultArray = array.sort(function (a, b) {
    return a.isDone - b.isDone;
  });
  return resultArray;
}
