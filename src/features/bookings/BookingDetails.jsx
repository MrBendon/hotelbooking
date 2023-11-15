import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { CiCircleCheck } from "react-icons/ci";
import Button from "../../ui/Button";
import StatusTag from "../../ui/BookingStatus";
import { HiPencil } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import IconTextButton from "../../ui/IconTextButton";
import useBreakfastPrice from "./useBreakfastPrice";
import Spinner from "../../ui/Spinner";
import useAddBreakfast from "./useAddBreakfast";
import useAddBed from "./useAddBed";
import useAddPerson from "./useAddPerson";
import BookingUpdateDetails from "./BookingUpdateDetails";
import useUpdateTotalPrice from "./useUpdateTotalPrice";
import { device } from "../../styles/RWDPointSettings";
import Payment from "./Payment";

const StyledDetails = styled.section`
  width: 100%;
  border-radius: 5px;
  padding: 2rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  ${device.mobileL} {
    padding: 2rem 0.5rem;
  }
`;

const OperatorRow = styled.div`
  width: 100%;
  border-radius: 5px;
  padding: 2rem;
  background-color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Summary = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  justify-items: center;
  & img {
    width: 70rem;
    aspect-ratio: 16/9.5;
    border-radius: 5px;
  }

  ${device.tablet} {
    display: flex;
    flex-direction: column;
  }
`;

const SummaryInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  background-color: var(--color-grey-100);
`;

const InfoRow = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: ${({ columns = "1fr 2fr" }) => columns};
`;

const OtherCheck = styled.div`
  width: 100%;
  border-radius: 5px;
  padding: 2rem;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  ${device.mobileL} {
    padding: 2rem 0.5rem;
    gap: 1rem;
  }
`;

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

const Footer = styled.footer`
  width: 100%;
  border-radius: 5px;
  padding: 2rem;
  background-color: white;
  display: flex;
  align-items: center;
  gap: 3rem;
  justify-content: flex-end;
`;

const LineBreak = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid var(--color-grey-300);
`;

const BookingDetails = () => {
  const navigate = useNavigate();
  const {
    booking: [bookingDetail],
  } = useOutletContext();
  // console.log(bookingDetail);
  const { data, isLoading } = useBreakfastPrice();
  const { addBreakfast, isLoading: isUpdating } = useAddBreakfast();
  const { addBed, isLoading: isUpdatingBed } = useAddBed();
  const { addPerson, isLoading: isUpdatingPerson } = useAddPerson();
  const { updateTotalPrice, isLoading: isUpdatingTotalPrice } = useUpdateTotalPrice();

  //是否已經收足款項
  const isReceivedAllPayment = bookingDetail?.totalPrice === bookingDetail?.isPaidAmount;

  if (isLoading || isUpdating || isUpdatingBed || isUpdatingPerson || isUpdatingTotalPrice)
    return <Spinner />;

  if (!bookingDetail) {
    navigate("/bookings");
  }

  //早餐價格
  const breakfastPrice = data?.at(0)?.breakfastPrice;

  //訂單是否還可以修改的狀態
  const canUpdateData = bookingDetail.status === "confirmed" || bookingDetail.status === "pending";

  function handleAddBreakfast() {
    addBreakfast(bookingDetail.id);
    const calcTotalPrice =
      bookingDetail.roomPrice +
      (bookingDetail.numGuests + bookingDetail.addPerson) * breakfastPrice +
      bookingDetail.extrasPrice;

    const newIsPaidUp = calcTotalPrice === bookingDetail.isPaidAmount ? true : false;
    updateTotalPrice({ totalPrice: calcTotalPrice, id: bookingDetail.id, isPaid: newIsPaidUp });
  }
  function handleAddBed() {
    addBed({ id: bookingDetail.id, addBedNum: 1 });
  }
  function handleAddPerson() {
    addPerson({ id: bookingDetail.id, addPersonNum: 1 });
    const calcTotalPrice =
      bookingDetail.roomPrice + (bookingDetail.numGuests + 1) * breakfastPrice + bookingDetail.extrasPrice;

    updateTotalPrice({ totalPrice: calcTotalPrice, id: bookingDetail.id });
  }

  return (
    <StyledDetails>
      <OperatorRow>
        <span>訂單狀態：</span>
        <StatusTag status={bookingDetail.status} label={bookingDetail.status} />
      </OperatorRow>
      <Summary>
        <img src={bookingDetail.rooms.roomPhotos.at(0)} alt="" />
        <SummaryInfo>
          <InfoRow>
            <div>訂單ID :</div>
            <div>{bookingDetail.id}</div>
          </InfoRow>
          <InfoRow>
            <div>姓名 :</div>
            <div>
              {bookingDetail.guests.fullName} {bookingDetail.guests.gender === "male" ? "先生" : "小姐"}
            </div>
          </InfoRow>
          <InfoRow>
            <div>聯絡電話 :</div>
            <div>{bookingDetail.guests.phoneNumber}</div>
          </InfoRow>
          <InfoRow>
            <div>電子信箱 :</div>
            <div>{bookingDetail.guests.email}</div>
          </InfoRow>
          <InfoRow>
            <div>身分證號碼/護照ID :</div>
            <div>{bookingDetail.guests.nationalID}</div>
          </InfoRow>
          <InfoRow>
            <div>入住日期 :</div>
            <div>
              {bookingDetail.startDate} ～ {bookingDetail.endDate} 共 {bookingDetail.numNights} 晚
            </div>
          </InfoRow>

          <InfoRow>
            <div>入住房型 :</div>
            <div>{bookingDetail.rooms.name}</div>
          </InfoRow>
          <InfoRow>
            <div>入住人數 :</div>
            <div>共{bookingDetail.numGuests + bookingDetail.addPerson}人</div>
          </InfoRow>
          <InfoRow>
            <div>付款狀態 :</div>
            <div>
              {bookingDetail.totalPrice === bookingDetail.isPaidAmount ? (
                <div>
                  <CiCircleCheck style={{ color: "green" }} />
                  已完成付款 (已付金額 {bookingDetail.isPaidAmount} 元)
                </div>
              ) : (
                <div>
                  尚未完成付款 (已付金額 ${bookingDetail.isPaidAmount || 0} 元)
                  <Modal>
                    <Modal.OpenButton openWindowName="editOrder">
                      <Button
                        type={
                          canUpdateData
                            ? isReceivedAllPayment
                              ? "receviedAllPayment"
                              : "notReceviedAllPayment"
                            : "receviedAllPayment"
                        }
                        disabled={canUpdateData ? (isReceivedAllPayment ? true : false) : true}
                      >
                        {isReceivedAllPayment ? "已付款" : "付款"}
                      </Button>
                    </Modal.OpenButton>
                    <Modal.Window name="editOrder">
                      <Payment bookingDetail={bookingDetail} breakfastPrice={breakfastPrice}></Payment>
                    </Modal.Window>
                  </Modal>
                  {/* <Button
                    type={
                      canUpdateData
                        ? isReceivedAllPayment
                          ? "receviedAllPayment"
                          : "notReceviedAllPayment"
                        : "receviedAllPayment"
                    }
                    disabled={canUpdateData ? (isReceivedAllPayment ? true : false) : true}
                  >
                    {isReceivedAllPayment ? "已付款" : "付款"}
                  </Button> */}
                </div>
              )}
            </div>
          </InfoRow>
        </SummaryInfo>
      </Summary>
      <LineBreak />
      <OtherCheck>
        <InfoRow>
          <div>加購早餐</div>
          <div>
            {bookingDetail.hasBreakfast ? (
              "✅ 已有附早餐"
            ) : (
              <>
                <span>無 None </span>
                <Button
                  type={canUpdateData ? "addservice" : "addserviceDisabled"}
                  onClick={() => handleAddBreakfast()}
                  disabled={!canUpdateData}
                >
                  加購早餐
                </Button>
              </>
            )}
          </div>
        </InfoRow>
        <InfoRow>
          <div>加床</div>
          <div>
            {bookingDetail.addBed ? (
              `${bookingDetail.addBed}床`
            ) : (
              <>
                <span>無 None </span>
                {bookingDetail.rooms.canAddBed && (
                  <Button
                    type={canUpdateData ? "addservice" : "addserviceDisabled"}
                    onClick={() => handleAddBed()}
                    disabled={!canUpdateData}
                  >
                    加床
                  </Button>
                )}
              </>
            )}
          </div>
        </InfoRow>
        <InfoRow>
          <div>加人頭</div>
          <div>
            {bookingDetail.addPerson ? (
              `${bookingDetail.addPerson}人`
            ) : (
              <>
                <span>無 None </span>
                {bookingDetail.rooms.canAddPerson ? (
                  <Button
                    type={canUpdateData ? "addservice" : "addserviceDisabled"}
                    onClick={() => handleAddPerson()}
                    disabled={!canUpdateData}
                  >
                    加人
                  </Button>
                ) : null}
              </>
            )}
          </div>
        </InfoRow>
        <InfoRow>
          <div>特殊要求</div>
          <div>{bookingDetail.specialRoomRequests || "無"}</div>
        </InfoRow>

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
          <LineBreak></LineBreak>
          <LineBreak></LineBreak>
          <div>總計</div>
          <strong>
            $
            {bookingDetail.hasBreakfast
              ? bookingDetail.roomPrice +
                bookingDetail.extrasPrice +
                (bookingDetail.numGuests + bookingDetail.addPerson) * breakfastPrice
              : bookingDetail.roomPrice + bookingDetail.extrasPrice}
          </strong>
        </CalculatArea>
      </OtherCheck>
      <LineBreak />
      <Footer>
        <Modal>
          <Modal.OpenButton openWindowName="editOrder">
            <IconTextButton disabled={!canUpdateData} icon={<HiPencil />}>
              {/* <IconTextButton icon={<HiPencil />}> */}
              編輯訂單狀態
            </IconTextButton>
          </Modal.OpenButton>
          <Modal.Window name="editOrder">
            <BookingUpdateDetails
              booking={bookingDetail}
              breakfastPrice={breakfastPrice}
            ></BookingUpdateDetails>
          </Modal.Window>
        </Modal>
      </Footer>
    </StyledDetails>
  );
};

export default BookingDetails;
