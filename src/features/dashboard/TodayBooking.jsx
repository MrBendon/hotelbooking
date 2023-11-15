import { Link } from "react-router-dom";
import styled from "styled-components";

const DataLayout = styled(Link)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 1rem;
  gap: 0.5rem;
  border-radius: 3px;
  justify-items: center;
  position: relative;

  &:nth-child(even) {
    background-color: var(--color-grey-50);
  }

  &::before {
    content: "";
    width: 0;
    height: 100%;
    transition: all 0.35s;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:hover {
    background-color: var(--color-grey-200);
  }

  &:hover::before {
    width: 5px;
    border-radius: 3px;
    background-color: blue;
  }
`;

const TodayBooking = ({ booking }) => {
  return (
    <DataLayout to={`/bookings/${booking.id}`}>
      <span>{booking.guests.fullName}</span>
      <span> {booking.guests.gender === "male" ? "先生" : "小姐"}</span>
      <span>{booking.numGuests} 位</span>
      <span>{booking.numNights} 晚</span>
    </DataLayout>
  );
};

export default TodayBooking;
