import { useForm } from "react-hook-form";
import { AddSectionForm, InputBox, InfoRow, ErrorMessage, Footer, HintSuper } from "../../ui/AddNewBookingUI";
import Button from "../../ui/Button";
import StyledInput from "../../ui/StyledInput";
import StyledSelect from "../../ui/StyledSelect";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import { useRooms } from "../rooms/useRooms";
import useQueryGuests from "./useQueryGuests";
import StyledTextArea from "../../ui/StyledTextArea";
import { differenceInDays } from "date-fns";

const AddNewBooking = ({ setNowStep, newGuestId, setNewBookingData, breakfastPrice }) => {
  const { data: rooms, isLoading: isLoadingRooms } = useRooms();

  const [selectRoom, setSelectRoom] = useState({});
  //   console.log(selectRoom);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm();
  const { data: allGuests, isLoading: isLoadingGuests } = useQueryGuests();
  const isSelectRoomEmptyObject = Object.entries(selectRoom).length === 0;
  //   console.log(isSelectRoomEmptyObject);
  //   console.log("errors:", errors);

  function handleChangeGuest(e) {
    console.log(e.target.value);
    // setNewGuestId(+e.target.value);
    clearErrors("guestId");
  }

  function handleChangeSelectRoom(e) {
    const [targetRoom] = rooms.filter((room) => room.id === +e.target.value);
    setSelectRoom(targetRoom);
    if (!targetRoom.canAddBed) setValue("addBed", "false");
    if (!targetRoom.canAddPerson) setValue("addPerson", "false");
    clearErrors("roomId");
  }

  function handleChangeNumGuests() {
    clearErrors("numGuests");
  }

  function handleSubmitRoom(data) {
    // console.log(data);
    const leftDayArray = data.startDate.split("-");
    const rightDayArray = data.endDate.split("-");

    const numNights = Math.abs(
      differenceInDays(
        new Date(leftDayArray[0], leftDayArray[1], leftDayArray[2]),
        new Date(rightDayArray[0], rightDayArray[1], rightDayArray[2])
      )
    );

    let totalPrice;
    if (data.hasBreakfast === "false") {
      data.hasBreakfast = false;
    }
    if (data.hasBreakfast) {
      totalPrice = selectRoom.discount
        ? selectRoom.discount + (data.addPerson + data.numGuests) * breakfastPrice * numNights
        : selectRoom.regularPrice + (data.addPerson + data.numGuests) * breakfastPrice * numNights;
    } else {
      totalPrice = selectRoom.discount ? selectRoom.discount : selectRoom.regularPrice;
    }
    const newData = {
      ...data,
      guestId: data.guestId ? data.guestId : newGuestId,
      numNights,
      roomPrice: selectRoom.discount ? selectRoom.discount : selectRoom.regularPrice,
      extrasPrice: 0,
      totalPrice: totalPrice,
      isPaid: false,
      isPaidAmount: 0,
      status: "pending",
    };
    console.log("要提交物件：", newData);
    setNewBookingData(newData);
    setNowStep((prev) => prev + 1);
  }

  if (isLoadingRooms || isLoadingGuests) return <Spinner />;

  return (
    <AddSectionForm onSubmit={handleSubmit(handleSubmitRoom)}>
      <InfoRow as={"h2"} span={2}>
        新增訂單資訊
      </InfoRow>

      {!newGuestId && (
        <InputBox>
          <label>
            <HintSuper>*</HintSuper> 客戶資料：
          </label>
          <StyledSelect
            haserror={errors.guestId}
            {...register("guestId", { required: true, valueAsNumber: true })}
            onChange={(e) => handleChangeGuest(e)}
          >
            <option selected disabled value="">
              請選擇客戶
            </option>
            {allGuests?.map((guest) => (
              <option key={guest.id} value={guest.id}>
                {guest.fullName}
              </option>
            ))}
          </StyledSelect>
          <span></span>
          <ErrorMessage haserror={errors.guestId}>{errors.guestId?.type}</ErrorMessage>
        </InputBox>
      )}

      <InputBox>
        <label>
          <HintSuper>*</HintSuper> 選擇房型：
        </label>
        <StyledSelect
          haserror={errors.roomId}
          {...register("roomId", { required: true, valueAsNumber: true })}
          onChange={handleChangeSelectRoom}
        >
          <option selected disabled value="">
            請選擇房型
          </option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </StyledSelect>
        <span></span>
        <ErrorMessage haserror={errors.roomId}>{errors.roomId?.type}</ErrorMessage>
      </InputBox>

      <InputBox>
        <label>
          <HintSuper>*</HintSuper> 入住日期：
        </label>
        <StyledInput
          haserror={errors.startDate}
          {...register("startDate", { required: true })}
          inputtype="date"
        />
        <span></span>
        <ErrorMessage haserror={errors.startDate}>{errors.startDate?.type}</ErrorMessage>
      </InputBox>

      <InputBox>
        <label>
          <HintSuper>*</HintSuper>退房日期：
        </label>
        <StyledInput
          {...register("endDate", { required: true })}
          inputtype="date"
          haserror={errors.endDate}
        />
        <span></span>
        <ErrorMessage haserror={errors.endDate}>{errors.endDate?.type}</ErrorMessage>
      </InputBox>

      <InputBox>
        <label>
          <HintSuper>*</HintSuper> 入住人數：
        </label>
        <StyledSelect
          haserror={errors.numGuests}
          {...register("numGuests", { required: true, valueAsNumber: true })}
          onChange={(e) => handleChangeNumGuests(e)}
        >
          <option selected disabled value="">
            請選擇
          </option>
          {Array.from({ length: selectRoom.maxCapacity }, (num, i) => i + 1).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </StyledSelect>
        <span></span>
        {isSelectRoomEmptyObject && (
          <ErrorMessage haserror="true">
            <HintSuper>請先選擇入住房型</HintSuper>
          </ErrorMessage>
        )}
        {!isSelectRoomEmptyObject && (
          <ErrorMessage haserror={errors.numGuests}>{errors.numGuests?.type}</ErrorMessage>
        )}
      </InputBox>

      <InputBox>
        <label>
          <HintSuper>*</HintSuper> 是否加購早餐：
        </label>
        <StyledSelect
          {...register("hasBreakfast", {
            required: true,
            setValueAs: (value) => (value === "true" ? true : "false"),
          })}
        >
          <option selected disabled value="">
            請選擇
          </option>
          <option value="false">否</option>
          <option value="true">是</option>
        </StyledSelect>
        <span></span>
        <ErrorMessage haserror={errors.hasBreakfast}>{errors.hasBreakfast?.type}</ErrorMessage>
      </InputBox>

      <InputBox>
        <label>
          <HintSuper>*</HintSuper> 是否要加床：
        </label>
        <StyledSelect
          disabled={!selectRoom.canAddBed}
          {...register("addBed", {
            required: selectRoom.canAddBed ? true : false,
            setValueAs: (value) => (value === "true" ? 1 : 0),
          })}
        >
          <option selected={selectRoom.canAddBed} disabled value="">
            請選擇
          </option>
          <option value="false">否</option>
          <option value="true">是</option>
        </StyledSelect>
        <span></span>
        <ErrorMessage haserror={errors.addBed}>{errors.addBed?.type}</ErrorMessage>
      </InputBox>

      <InputBox>
        <label>
          <HintSuper>*</HintSuper> 是否要加人：
        </label>
        <StyledSelect
          disabled={!selectRoom.canAddPerson}
          {...register("addPerson", {
            required: selectRoom.canAddPerson ? true : false,
            setValueAs: (value) => (value === "true" ? 1 : 0),
          })}
        >
          <option selected={selectRoom.canAddPerson} disabled value="">
            請選擇
          </option>
          <option value="false">否</option>
          <option value="true">是</option>
        </StyledSelect>
        <span></span>
        <ErrorMessage haserror={errors.addPerson}>{errors.addPerson?.type}</ErrorMessage>
      </InputBox>

      <InputBox>
        <label>特殊需求：</label>
        <StyledTextArea {...register("specialRoomRequests")} />
        <span></span>
        <ErrorMessage>1</ErrorMessage>
      </InputBox>

      <Footer>
        <Button type="submit">提交</Button>
      </Footer>
    </AddSectionForm>
  );
};

export default AddNewBooking;
