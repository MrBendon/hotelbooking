import Spinner from "../../ui/Spinner";
import useQueryGuests from "./useQueryGuests";

import { AddSectionForm, InputBox, InfoRow, Footer, HintSub, SytledLine } from "../../ui/AddNewBookingUI";
import { useRooms } from "../rooms/useRooms";
import Button from "../../ui/Button";
import useAddNewBooking from "./useAddNewBooking";
import { useNavigate, useOutletContext } from "react-router-dom";

const keyToTW = {
  fullName: "姓名",
  email: "電子信箱",
  nationalCode: "國家代碼",
  nationality: "國家名稱",
  nationalID: "身分證號碼/護照號碼",
  gender: "性別",
  phoneNumber: "聯絡電話",
};

const AddConfirmPage = ({ setNowStep, newBookingData, breakfastPrice }) => {
  const { setIsAddNewBooking } = useOutletContext();
  const navigate = useNavigate();
  const { data: rooms, isLoading: isLoadingRooms } = useRooms();
  const { data: allGuestData, isLoading: isLoadingAllGuests } = useQueryGuests();
  const {
    upLoadNewBooking,
    isLoading: isUpLoadingNewBooking,
    isSuccess: isUpLoadSuccess,
  } = useAddNewBooking();
  const [room] = rooms.filter((room) => room.id === newBookingData.roomId);
  //   console.log(room);
  const [targetGuest] = allGuestData.filter((guest) => guest.id === newBookingData.guestId);
  const { id, created_at, ...guestObject } = targetGuest;

  if (!id || !created_at) console.log(id, created_at);

  const guest = Object.entries(guestObject);
  //   console.log(guest);

  if (isLoadingRooms || isLoadingAllGuests || isUpLoadingNewBooking) return <Spinner />;

  if (isUpLoadSuccess) {
    navigate("/bookings");
  }

  function handleGoBack() {
    setNowStep((prev) => prev - 1);
  }

  function handleSubmit() {
    // console.log("submit");
    console.log(newBookingData);
    upLoadNewBooking(newBookingData);
    setIsAddNewBooking(false);
  }

  return (
    <AddSectionForm as={"div"}>
      <InfoRow as={"h2"} span={2}>
        新增訂單內容
      </InfoRow>

      <InfoRow as={"h3"} span={2}>
        客戶資料
      </InfoRow>

      {guest.map(([key, value]) => (
        <InputBox key={key}>
          <span>{keyToTW[`${key}`]}:</span>
          <span>{value}</span>
        </InputBox>
      ))}

      <InfoRow as={"h3"} span={2}>
        房型訂購明細
      </InfoRow>
      <InputBox>
        <span>訂購房型：</span>
        <span>{room.name}</span>
      </InputBox>
      <InputBox>
        <span>房型種類：</span>
        <span>{room.roomType}</span>
      </InputBox>

      <InputBox>
        <span>入住人數：</span>
        <span>{newBookingData.numGuests}人</span>
      </InputBox>

      <InputBox>
        <span>入住日期：</span>
        <span>
          {newBookingData.startDate} ~ {newBookingData.endDate} (共{newBookingData.numNights}晚)
        </span>
      </InputBox>

      <InputBox>
        <span>是否加床：</span>
        <span>{newBookingData.addBed === 0 ? "否" : `加${newBookingData.addBed}床`}</span>
        <HintSub>{room.canAddBed ? "(該房型可提供加床服務)" : "(該房型 不 提供加床服務)"}</HintSub>
      </InputBox>

      <InputBox>
        <span>是否加人頭：</span>
        <span>{newBookingData.addPerson === 0 ? "否" : `加${newBookingData.addPerson}人`}</span>
        <HintSub>{room.canAddPerson ? "(該房型可提供加人服務)" : "(該房型 不 提供加人服務)"}</HintSub>
      </InputBox>

      <InputBox>
        <span>是否有加購早餐：</span>
        <span>{newBookingData.hasBreakfast ? "是" : "否"}</span>
      </InputBox>

      <InputBox>
        <span>房間是否面海：</span>
        <span>{room.roomFeatures.face === "海景" ? "是" : "否"}</span>
      </InputBox>

      <span></span>
      <AddSectionForm as={"div"} backgroundcolor="var(--color-grey-200)">
        <InfoRow>房間價格</InfoRow>
        <InfoRow flex="flex" justifycontent="flex-end">
          ${room.discount ? room.discount : room.regularPrice}
        </InfoRow>
        <InputBox span={2}>
          <InfoRow>早餐價格</InfoRow>
          <InfoRow flex="flex" justifycontent="flex-end">
            $
            {newBookingData.hasBreakfast
              ? (newBookingData.numGuests + newBookingData.addPerson) *
                newBookingData.numNights *
                breakfastPrice
              : 0}
          </InfoRow>
          <HintSub>
            {newBookingData.numGuests + newBookingData.addPerson}位*{newBookingData.numNights}晚*早餐單價
            {breakfastPrice}
          </HintSub>
          <HintSub></HintSub>
        </InputBox>

        <SytledLine></SytledLine>
        <InfoRow>小計</InfoRow>
        <InfoRow flex="flex" justifycontent="flex-end">
          ${newBookingData.totalPrice}
        </InfoRow>
      </AddSectionForm>

      <Footer>
        <Button type="skip" onClick={handleGoBack}>
          返回上一頁
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          送出訂單
        </Button>
      </Footer>
    </AddSectionForm>
  );
};

export default AddConfirmPage;
