import styled from "styled-components";
import TodayUpComing from "../features/dashboard/TodayUpComing";
import Bulletin from "../features/dashboard/Bulletin";
import DurationChart from "../features/dashboard/DurationChart";
import useQueryBookings from "../features/bookings/useQueryBookings";
import SpinnerLoader from "../ui/SpinnerLoader";
import Rate from "../features/dashboard/Rate";
import { useRooms } from "../features/rooms/useRooms";
import Spinner from "../ui/Spinner";
import { calcDayRevenue } from "../utils/calcDayRevenue";
import useQueryAllRoomsName from "../features/rooms/useQueryAllRoomsName";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import { calcTheDayOccupancyRate } from "../utils/calcTheDayOccupancyRate";
import { device } from "../styles/RWDPointSettings";

const DashBoardLayout = styled.div`
  display: grid;
  max-height: calc(100vh - 9rem);
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(5, 1fr);
  padding: 2rem;
  gap: 1.5rem;
  background-color: var(--color-grey-100);
  border-radius: 1rem;

  ${device.tablet} {
    grid-template-rows: repeat(4, 25rem) max-content;
    max-height: max-content;
  }
`;

// const StyledLayoutDiv = styled.div`
//   grid-column: ${(props) => props.columns};
//   grid-row: ${(props) => props.rows};
//   border-radius: 1rem;
//   padding: 1rem;
//   /* background-color: var(--color-grey-0); */
//   background-color: ${(props) => props.bgc || " var(--color-grey-0)"};
// `;

const TodayUpComingBox = styled.div`
  grid-column: 1/5;
  grid-row: 1/3;
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${(props) => props.bgc || " var(--color-grey-0)"};

  ${device.tablet} {
    grid-column: 1/-1;
    grid-row: 1/2;
  }
`;

const RateBox = styled.div`
  grid-column: 5/8;
  grid-row: 1/3;
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${(props) => props.bgc || " var(--color-grey-0)"};

  ${device.tablet} {
    grid-column: 1/-1;
    grid-row: 2/3;
  }
`;

const ChartBox = styled.div`
  grid-column: 1/-4;
  grid-row: 3/-1;
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${(props) => props.bgc || " var(--color-grey-0)"};

  ${device.tablet} {
    grid-column: 1/-1;
    grid-row: 3/5;
  }
`;

const BulletinBox = styled.div`
  grid-column: 8/-1;
  grid-row: 1/-1;
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${(props) => props.bgc || " var(--color-grey-0)"};

  ${device.tablet} {
    grid-column: 1/-1;
    grid-row: 5/-1;
  }
`;

const StyledFilterBox = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  justify-content: flex-end;
  gap: 1rem;
`;

const StyldH4 = styled.h4`
  padding: 1rem 0;
`;

const Home = () => {
  const [nowDayFilter, setNowDayFilter] = useState(7);
  const { data: bookings, isLoading: isLoadingBookings } = useQueryBookings();
  const { data: rooms, isLoading: isLoadingRooms } = useRooms();
  // console.log(bookings);
  const { data: roomsNameArray, isLoading: isLoadingAllRoomsName } = useQueryAllRoomsName();

  useEffect(() => {}, []);

  if (isLoadingRooms || isLoadingBookings || isLoadingAllRoomsName) return <Spinner></Spinner>;

  //飯店全部房間入住率計算

  const TodayOccupancyRate = calcTheDayOccupancyRate(rooms, bookings);

  //營收計算與各個房型的使用率
  const resultData = calcDayRevenue(bookings, nowDayFilter, roomsNameArray);
  console.log(resultData);

  function handleClick(e) {
    setNowDayFilter(e.target.value);
  }

  return (
    <DashBoardLayout>
      <TodayUpComingBox>
        {isLoadingBookings ? <SpinnerLoader /> : <TodayUpComing data={bookings} />}
      </TodayUpComingBox>

      <RateBox>
        <Rate rate={TodayOccupancyRate} />
      </RateBox>

      <ChartBox>
        <StyldH4>DurationChart 收入統計圖表 </StyldH4>
        <StyledFilterBox>
          <Button
            onClick={handleClick}
            type={nowDayFilter === "7" ? "activeFilterButton" : "filterButton"}
            value={7}
          >
            近7天
          </Button>
          <Button
            onClick={handleClick}
            type={nowDayFilter === "30" ? "activeFilterButton" : "filterButton"}
            value={30}
          >
            近30天
          </Button>
          <Button
            onClick={handleClick}
            type={nowDayFilter === "90" ? "activeFilterButton" : "filterButton"}
            value={90}
          >
            近90天
          </Button>
        </StyledFilterBox>
        <DurationChart data={resultData} />
      </ChartBox>

      <BulletinBox>
        <Bulletin />
      </BulletinBox>
    </DashBoardLayout>
  );
};

export default Home;
