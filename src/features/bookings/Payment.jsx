import { device } from "../../styles/RWDPointSettings";

import styled from "styled-components";
import Button from "../../ui/Button";
import usePay from "./usePay";
import Spinner from "../../ui/Spinner";
import useBreakfastPrice from "./useBreakfastPrice";

const CalculatArea = styled.div`
  grid-column: 2/-1;
  background-color: var(--color-grey-100);
  grid-row: 1/8;
  display: grid;
  grid-template-columns: 1fr 3fr;
  justify-items: end;
  padding: 2rem;

  ${device.mobileL} {
    grid-template-columns: 2fr 3fr;
    padding: 2rem 1rem;
  }
`;

const LineBreak = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid var(--color-grey-300);
`;

const Title = styled.div`
  width: max-content;
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0rem auto;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Footer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;

const Payment = ({ bookingDetail, onCloseModal }) => {
  const { data, isLoading } = useBreakfastPrice();
  const breakfastPrice = data?.at(0)?.breakfastPrice;
  const { pay, isLoading: isPaying } = usePay();

  const finalPayment = bookingDetail.hasBreakfast
    ? bookingDetail.roomPrice +
      bookingDetail.extrasPrice +
      (bookingDetail.numGuests + bookingDetail.addPerson) * breakfastPrice -
      bookingDetail.isPaidAmount
    : bookingDetail.roomPrice + bookingDetail.extrasPrice - bookingDetail.isPaidAmount;

  if (isLoading || isPaying) return <Spinner></Spinner>;

  function handleClick() {
    const payData = {
      id: bookingDetail.id,
      total: bookingDetail.totalPrice,
      isPaid: true,
    };
    // console.log(payData);
    pay(payData);
    onCloseModal();
  }
  return (
    <Page>
      <Title>費用明細</Title>
      <CalculatArea>
        <div>住宿費用</div>
        <div>${bookingDetail.roomPrice}</div>
        <div>早餐</div>
        <div>
          $
          {bookingDetail.hasBreakfast
            ? (bookingDetail.numGuests + bookingDetail.addPerson) * breakfastPrice
            : 0}
        </div>
        <div>其他費用</div>
        <div>${bookingDetail.extrasPrice}</div>
        <div>消費稅</div>
        <div>${Math.round((bookingDetail.roomPrice + bookingDetail.extrasPrice) * 0.05)}</div>
        <div>優惠</div>
        <div>-${Math.round((bookingDetail.roomPrice + bookingDetail.extrasPrice) * 0.05)}</div>
        <div>已支付金額</div>
        <div>-${bookingDetail.isPaidAmount}</div>
        <LineBreak></LineBreak>
        <LineBreak></LineBreak>
        <strong>應支付金額</strong>
        <strong>${finalPayment}</strong>
      </CalculatArea>
      <Footer>
        <Button type="cancel" onClick={onCloseModal}>
          取消
        </Button>
        <Button type="confirm" onClick={() => handleClick()}>
          點擊支付 ${finalPayment}
        </Button>
      </Footer>
    </Page>
  );
};

export default Payment;
