import styled from "styled-components";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ui/ErrorMessage";
import useAddNewEvent from "./useAddNewEvent";
import Spinner from "../../ui/Spinner";
import useClickOutSide from "../../hooks/useClickOutSide";

const StyledDiv = styled.div`
  position: fixed;
  top: 30%;
  right: ${(props) => (props.open ? "6rem" : "-40rem")};
  width: 40rem;
  height: 35rem;
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  transition: all 0.5s ease-in-out;
  background-color: var(--color-grey-200);
  z-index: 30;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: repeat(4, 1fr 0.4fr);
  align-items: center;
  /* justify-items: center; */
  gap: 1rem;
`;

const StyledBox = styled.div`
  width: 100%;
  grid-column: span ${(props) => props.$colspan};
  grid-row: span ${(props) => props.$rowspan};
  display: flex;
  justify-content: center;
  gap: 2rem;
  /* margin-top: rem; */
`;

const StyledSelect = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid grey;
  &:focus {
    outline: 2px solid #2877cc;
  }
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid grey;
  &:focus {
    outline: 2px solid #2877cc;
  }
`;

const eventCategorys = {
  counter: "櫃檯",
  other: "其他",
  room: "房務",
};

const AddnewEvent = ({ isOpen, setIsOpen }) => {
  const ref = useClickOutSide(handleClickCancel);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { add, isLoading } = useAddNewEvent();

  function handleClickCancel() {
    reset({ categoryName: "", eventContent: "" });
    setIsOpen(false);
  }

  function handleClickAdd(data) {
    // console.log(data);

    const newEvent = {
      ...data,
      eventCategory: eventCategorys[data.categoryName],
      isDone: false,
    };
    console.log(newEvent);
    add(newEvent);
    reset({ categoryName: "", eventContent: "" });
    setIsOpen(false);
  }
  if (isLoading) return <Spinner></Spinner>;

  return (
    <StyledDiv open={isOpen} ref={ref}>
      <StyledBox as={"h3"} $colspan={2} $rowspan={2}>
        新增事件
      </StyledBox>
      <StyledBox>選擇分類：</StyledBox>
      <StyledSelect {...register("categoryName", { required: true })} defaultValue="">
        <option value="" disabled>
          請選擇
        </option>
        <option value="room">房務</option>
        <option value="other">其他</option>
        <option value="counter">櫃檯</option>
      </StyledSelect>
      <div></div>
      <ErrorMessage error={errors.categoryName?.type}></ErrorMessage>
      <StyledBox>事件內容：</StyledBox>
      <StyledInput
        {...register("eventContent", { required: true })}
        type="text"
        placeholder="請輸入事件內容"
      />
      <div></div>
      <ErrorMessage error={errors.eventContent?.type}></ErrorMessage>
      <StyledBox $colspan={2} $rowspan={2}>
        <Button type="addservice" onClick={handleClickCancel}>
          取消
        </Button>
        <Button type="addservice" onClick={handleSubmit(handleClickAdd)}>
          確認
        </Button>
      </StyledBox>
    </StyledDiv>
  );
};

export default AddnewEvent;
