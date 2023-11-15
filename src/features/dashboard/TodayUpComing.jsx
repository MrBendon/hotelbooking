import styled from "styled-components";
import { getToday } from "../../utils/helpers";
import TodayBooking from "./TodayBooking";
import { device } from "../../styles/RWDPointSettings";

const Layout = styled.div`
  width: 100%;
  max-height: 14rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: purple green;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #d5d5d5;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #39a1ce;
    border-radius: 10px;
  }
`;

const StyldDiv = styled.h4`
  padding: 1rem 0;
  ${device.laptop} {
    font-size: 1.5rem;
  }
`;

const Span = styled.span`
  color: var(--color-grey-400);
  font-size: 2rem;
  font-weight: 600;
`;

const TodayUpComing = ({ data }) => {
  // console.log(data);
  const today = getToday();
  // const today = "2023-10-28";

  const todayHasBooking = data.filter((item) => item.startDate === today).length !== 0;
  // console.log(todayHasBooking);

  return (
    <>
      <StyldDiv>TodayBookings 今日訂單</StyldDiv>
      <Layout>
        {!todayHasBooking ? (
          <Span>今日無訂單 No Booking</Span>
        ) : (
          data
            ?.filter((item) => item.startDate === today)
            .map((item) => <TodayBooking booking={item} key={item.id} />)
        )}
      </Layout>
    </>
  );
};

export default TodayUpComing;
