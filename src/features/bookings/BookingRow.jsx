import { useNavigate } from "react-router-dom";
import StatusTag from "../../ui/BookingStatus";
import BookingTable from "../../ui/BookingTable";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiMiniLink } from "react-icons/hi2";
import styled from "styled-components";
import Button from "../../ui/Button";
import { device } from "../../styles/RWDPointSettings";
import Modal from "../../ui/Modal";
import Payment from "./Payment";

const StyledAbstract = styled.div`
  display: flex;
  flex-direction: column;

  ${device.laptop} {
    grid-column: span 5;
  }
`;

const BookingRow = ({ booking }) => {
  const navigate = useNavigate();

  function handleClickRow() {
    navigate(`/bookings/${booking.id}`);
  }
  return (
    <BookingTable.Row>
      <BookingTable.DataTitle>訂單ＩＤ</BookingTable.DataTitle>
      <div>{booking.id}</div>
      <BookingTable.DataTitle>姓名</BookingTable.DataTitle>
      <div>{booking.guests.fullName}</div>

      <BookingTable.DataTitle>訂單狀態</BookingTable.DataTitle>
      <BookingTable.DataTitle>
        <StatusTag status={booking.status} label={booking.status} />
      </BookingTable.DataTitle>

      <BookingTable.DataTitle>訂單摘要</BookingTable.DataTitle>
      <StyledAbstract>
        <div>房型：{booking.rooms.name}</div>
        <div>
          入住時間：{booking.startDate} ~ {booking.endDate} (共 {booking.numNights} 晚)
        </div>
        <div>
          {booking.numGuests}人 {booking.rooms.roomFeatures.numberOfBeds} (
          {booking.hasBreakfast ? "含早餐" : "不含早餐"})
        </div>
      </StyledAbstract>

      <BookingTable.Hide>
        <StatusTag status={booking.status} label={booking.status} />
      </BookingTable.Hide>
      <BookingTable.DataTitle>訂單金額</BookingTable.DataTitle>
      <div>{booking.totalPrice}</div>
      <BookingTable.DataTitle>付款狀態</BookingTable.DataTitle>
      <Modal>
        <Modal.OpenButton openWindowName="openPay">
          <Button
            type={
              booking.totalPrice === booking.isPaidAmount ? "receviedAllPayment" : "notReceviedAllPayment"
            }
            disabled={booking.totalPrice === booking.isPaidAmount ? true : false}
          >
            {booking.isPaid ? "已付款" : "付款"}
          </Button>
        </Modal.OpenButton>
        <Modal.Window name="openPay">
          <Payment bookingDetail={booking}></Payment>
        </Modal.Window>
      </Modal>
      {/* <Button
        type={booking.totalPrice === booking.isPaidAmount ? "receviedAllPayment" : "notReceviedAllPayment"}
        disabled={booking.totalPrice === booking.isPaidAmount ? true : false}
      >
        {booking.isPaid ? "已付款" : "付款"}
      </Button> */}
      <BookingTable.DataTitle>訂單詳情</BookingTable.DataTitle>
      <ButtonIcon type="pure" onClick={() => handleClickRow()}>
        <HiMiniLink />
        <span>Detail</span>
      </ButtonIcon>
    </BookingTable.Row>
  );
};

export default BookingRow;
