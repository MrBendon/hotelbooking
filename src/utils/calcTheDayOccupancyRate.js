import { getToday } from "./helpers";

//roomsData是飯店中所有的房間資料
export function calcTheDayOccupancyRate(roomsData, bookings) {
  //計算出飯店的全部房間數量
  const totalRooms = roomsData?.reduce(function (acc, cur) {
    return (acc = acc + cur.numRooms);
  }, 0);
  // const today = getToday();
  const today = "2023-10-28";
  //篩選出今日訂單房間使用量
  const inRangeDateBookingNum = bookings?.reduce(function (acc, cur) {
    if (cur.startDate <= today && cur.endDate > today) {
      return (acc = acc + 1);
    } else {
      return acc;
    }
  }, 0);
  //使用率計算
  const TodayOccupancyRate = Number(((inRangeDateBookingNum / totalRooms) * 100).toFixed(0));

  return TodayOccupancyRate;
}
