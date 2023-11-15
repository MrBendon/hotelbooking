import { eachDayOfInterval, format, subDays } from "date-fns";
import { getToday } from "./helpers";

export function calcDayRevenue(bookings, period, roomsNameArray) {
  //   console.log(roomsNameArray);
  const today = getToday();
  const startDate = format(subDays(new Date(today), period - 1), "yyyy-MM-dd");

  //指定日期區間的日期陣列 （Ｘ軸）
  const periodDaysListArray = eachDayOfInterval({
    start: new Date(startDate),
    end: new Date(today),
  }).map((date) => format(date, "yyyy-MM-dd"));

  //符合指定日期區間內的訂單
  const PeriodBookings = bookings.filter((booking) => booking.startDate >= startDate);

  //計算出指定日期區間內每一天的資料
  const DateObject = periodDaysListArray.map(function (date) {
    //篩選出同一天的所有訂單
    const sameDateBookings = PeriodBookings.filter((booking) => booking.startDate === date);

    //計算當天的營收
    const TheDayRevenue = sameDateBookings.reduce(function (acc, cur) {
      return (acc = acc + cur.totalPrice);
    }, 0);
    //計算當天各個房型的入住率
    const roomOccupancyRate = roomsNameArray.map(function (room) {
      const TheDayTheRoomUsageRate = sameDateBookings.reduce((acc, cur) => {
        if (cur.rooms.name === room.roomName) {
          return (acc = acc + 1);
        } else {
          return acc;
        }
      }, 0);

      return { ...room, roomOccupancyRate: (TheDayTheRoomUsageRate / room.numRooms) * 100 };
    });

    const newDateFormat = format(new Date(date), "MM/dd");

    //將每一天的日期、營收、各個房型的使用率放入物件中
    return { day: newDateFormat, revenue: TheDayRevenue, roomUsageRate: roomOccupancyRate };
  });

  return DateObject;
}
