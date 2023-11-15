import styled from "styled-components";
import ProgressBar from "../../ui/ProgressBar";
import { useState } from "react";
import AddNewGuest from "./AddNewGuest";
import AddNewBooking from "./AddNewBooking";
import AddConfirmPage from "./AddConfirmPage";
import Spinner from "../../ui/Spinner";
import useBreakfastPrice from "./useBreakfastPrice";

const BookingCommonDiv = styled.div`
  width: 100%;
  background-color: var(--color-grey-0);
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
`;

const NewBooking = () => {
  const [newGuestId, setNewGuestId] = useState();
  const [newBookingData, setNewBookingData] = useState({});
  const [nowStep, setNowStep] = useState(1);
  const { data: breakfastPriceArray, isLoading: isLoadingBreakfastPrice } = useBreakfastPrice();

  const breakfastPrice = breakfastPriceArray?.at(0).breakfastPrice;

  // console.log(newGuestId);

  if (isLoadingBreakfastPrice) return <Spinner />;

  return (
    <BookingCommonDiv>
      <h2>新增訂單</h2>
      <ProgressBar totalstep={3} nowstep={nowStep}></ProgressBar>

      {nowStep === 1 && <AddNewGuest setNowStep={setNowStep} setNewGuestId={setNewGuestId} />}

      {nowStep === 2 && (
        <AddNewBooking
          setNowStep={setNowStep}
          newGuestId={newGuestId}
          setNewGuestId={setNewGuestId}
          setNewBookingData={setNewBookingData}
          breakfastPrice={breakfastPrice}
        />
      )}
      {nowStep === 3 && (
        <AddConfirmPage
          setNowStep={setNowStep}
          newBookingData={newBookingData}
          breakfastPrice={breakfastPrice}
        />
      )}
    </BookingCommonDiv>
  );
};

export default NewBooking;
