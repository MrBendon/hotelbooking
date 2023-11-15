import styled from "styled-components";
import Button from "../../ui/Button";
import { differenceInDays } from "date-fns";
import { useForm } from "react-hook-form";
import useUpdateDetails from "./useUpdateDetails";

const StyledForm = styled.form`
  /* width: 700px; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 2rem;
`;

const StyledRow = styled.div`
  grid-column: span ${(props) => props?.span};
  display: grid;
  grid-template-columns: 1fr ${(props) => (props.span ? "1fr" : "2.5fr")};
  gap: 1rem;
  align-items: center;

  & div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const StyledSelect = styled.select`
  border-radius: 5px;
  border: 1ps solid grey;
  padding: 0.5rem;
  &:focus {
    outline: 1px solid var(--color-blue-700);
  }
`;

const StyledInput = styled.input`
  border-radius: 5px;
  border: 1px solid grey;
  padding: 0.5rem;

  &:focus {
    outline: 1px solid var(--color-blue-700);
  }
`;

const SytledLine = styled.div`
  grid-column: span 2;
  height: 1px;
  border-bottom: 1px dashed grey;
`;

const StyledRadio = styled.input.attrs({ type: "radio" })`
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const BookingChangeStatus = ({ booking, onCloseModal, breakfastPrice }) => {
  console.log(booking);
  const { register, handleSubmit } = useForm();
  const { update, isLoading: isUpdating } = useUpdateDetails();

  //處理提交表單
  function onSubmitFn(data) {
    // console.log(data);
    const transformData = {
      ...data,
      addBed: +data.addBed,
      addPerson: +data.addPerson,
      hasBreakfast: data.hasBreakfast === "true" ? true : false,
    };
    // console.log(transformData);
    const startDateArray = data.startDate.split("-");
    const endDateArray = data.endDate.split("-");
    const calcNights = Math.abs(
      differenceInDays(
        new Date(startDateArray[0], startDateArray[1], startDateArray[2]),
        new Date(endDateArray[0], endDateArray[1], endDateArray[2])
      )
    );
    const newTotalPrice = transformData.hasBreakfast
      ? booking.roomPrice +
        booking.extrasPrice +
        (booking.numGuests + transformData.addPerson) * breakfastPrice
      : booking.roomPrice + booking.extrasPrice;

    const newIsPaid = newTotalPrice === booking.isPaidAmount ? true : false;

    const newData = {
      ...transformData,
      id: booking.id,
      numNights: calcNights,
      totalPrice: newTotalPrice,
      isPaid: newIsPaid,
    };
    newData.guests.id = booking.guests.id;
    const Array = Object.entries(newData);
    const handleEmptyStringArray = Array.map(([key, value]) => {
      if (value === "") return [key, 0];
      return [key, value];
    });
    const newObject = Object.fromEntries(handleEmptyStringArray);
    console.log(newObject);
    update(newObject);
    onCloseModal();
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmitFn)}>
      <span>修改訂單狀態：</span>
      <StyledSelect {...register("status")} defaultValue={booking.status}>
        <option disabled={booking.status !== "pending"} value="pending">
          訂單未確認 Pending
        </option>
        <option disabled={booking.status !== "pending"} value="confirmed">
          訂單已確認，尚未入住 Confirmed
        </option>
        <option disabled={booking.status === "chechedOut" || booking.status === "noShow"} value="checkedIn">
          已入住 Checked In
        </option>
        <option disabled={booking.status === "noShow"} value="checkedOut">
          已退房 Checked Out
        </option>
        <option disabled={booking.status === "chechedOut" || booking.status === "chechedIn"} value="noShow">
          逾期未報到 No Show
        </option>
      </StyledSelect>
      <StyledRow span={2} justifycontent="flex-start">
        客戶資料
      </StyledRow>
      <StyledRow>
        <label>姓名：</label>
        <StyledInput type="text" defaultValue={booking.guests.fullName} {...register("guests.fullName")} />
      </StyledRow>
      <StyledRow>
        <span>性別：</span>
        <div>
          <StyledRadio
            type="radio"
            name="gender"
            value="male"
            defaultChecked={booking.guests.gender === "male"}
            disabled={isUpdating}
            {...register("guests.gender")}
          />
          男性
          <StyledRadio
            type="radio"
            name="gender"
            value="female"
            defaultChecked={booking.guests.gender === "female"}
            disabled={isUpdating}
            {...register("guests.gender")}
          />
          女性
        </div>
      </StyledRow>
      <StyledRow>
        <label>聯絡電話：</label>
        <StyledInput
          type="text"
          defaultValue={booking.guests.phoneNumber}
          disabled={isUpdating}
          {...register("guests.phoneNumber")}
        />
      </StyledRow>
      <StyledRow>
        <label>電子信箱：</label>
        <StyledInput
          type="text"
          defaultValue={booking.guests.email}
          {...register("guests.email")}
          disabled={isUpdating}
        />
      </StyledRow>

      <SytledLine></SytledLine>
      <span>修改服務：</span>
      <span></span>
      <StyledRow>
        <label>入住日期：</label>
        <StyledInput
          type="date"
          defaultValue={booking.startDate}
          {...register("startDate")}
          disabled={isUpdating}
        />
      </StyledRow>
      <StyledRow>
        <label>退房日期：</label>
        <StyledInput
          type="date"
          defaultValue={booking.endDate}
          {...register("endDate")}
          disabled={isUpdating}
        />
      </StyledRow>

      <StyledRow>
        <label>早餐：</label>
        <div>
          <div>
            <StyledRadio
              name="hasBreakfast"
              value={false}
              defaultChecked={booking.hasBreakfast ? false : true}
              disabled={isUpdating}
              {...register("hasBreakfast")}
            />
            無
          </div>
          <div>
            <StyledRadio
              name="hasBreakfast"
              value={true}
              defaultChecked={booking.hasBreakfast ? true : false}
              disabled={isUpdating}
              {...register("hasBreakfast")}
            />
            有
          </div>
        </div>
      </StyledRow>

      <StyledRow>
        <label>是否加床：</label>
        <div>
          <div>
            <StyledRadio
              name="addBed"
              value={""}
              defaultChecked={booking.addBed ? false : true}
              {...register("addBed")}
              disabled={isUpdating}
            />
            無
          </div>
          <div>
            <StyledRadio
              name="addBed"
              value={1}
              defaultChecked={booking.addBed ? true : false}
              {...register("addBed")}
              disabled={isUpdating}
            />
            加1床
          </div>
        </div>
      </StyledRow>
      <StyledRow>
        <label>是否加人頭：</label>
        <div>
          <div>
            <StyledRadio
              name="addPerson"
              value={""}
              defaultChecked={booking.addPerson ? false : true}
              {...register("addPerson")}
              disabled={isUpdating}
            />
            無
          </div>
          <div></div>
          <StyledRadio
            name="addPerson"
            value={1}
            defaultChecked={booking.addPerson ? true : false}
            {...register("addPerson")}
            disabled={isUpdating}
          />
          加1人
        </div>
      </StyledRow>

      <StyledRow span={2} justifycontent="flex-end">
        <Button size="large" onClick={() => onCloseModal()} disabled={isUpdating}>
          取消
        </Button>
        <Button size="large" color="blue" onClick={() => console.log("確定修改")} disabled={isUpdating}>
          確認修改
        </Button>
      </StyledRow>
    </StyledForm>
  );
};

export default BookingChangeStatus;
