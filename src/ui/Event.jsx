import { useState } from "react";
import styled from "styled-components";
import SpinnerLoader from "./SpinnerLoader";
import { HiXMark } from "react-icons/hi2";
import Modal from "./Modal";
import ComfirmBox from "./ComfirmBox";
import useDeleteEvent from "../features/dashboard/useDeleteEvent";
import useUpdateEvent from "../features/dashboard/useUpdateEvent";

const StyledEvent = styled.div`
  width: 100%;
  padding: 0.5rem 0.5rem;
  display: grid;
  grid-template-columns: 3rem 1fr;
`;

const StyleLabel = styled.label`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const StyledInput = styled.input`
  border-radius: 3px;
  width: 2rem;
  height: 2rem;
  visibility: hidden;
  position: relative;

  &:focus {
    outline: none;
  }

  &::after {
    content: "";
    visibility: visible;
    position: absolute;
    width: 2rem;
    height: 2rem;
    top: 0;
    right: 0rem;
    border-radius: 5px;
    border: 1px solid var(--color-grey-300);
  }
  &:checked::after {
    background-color: #0ebb92;
  }

  &:checked::before {
    content: "";
    visibility: visible;
    position: absolute;
    width: 1rem;
    height: 1.5rem;
    top: 0rem;
    left: 0.5rem;
    transform: rotate(45deg);
    border-bottom: 4px solid white;
    border-right: 4px solid white;
    z-index: 1;
  }
`;

const StyleContent = styled.span`
  text-decoration: ${(props) => (props.$isdone ? "line-through" : "none")};
  color: ${(props) => props.$isdone && "var(--color-grey-300)"};
  font-size: 1.5rem;
`;
const DeleteEvent = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  color: var(--color-grey-300);
  transition: all 0.35s;
  background-color: transparent;

  & svg {
    width: 100%;
    height: 100%;
  }
  &:hover {
    color: var(--color-grey-600);
  }
  &:focus {
    outline: none;
    color: var(--color-grey-600);
  }
`;

const Event = ({ event }) => {
  const [isCheck, setIsCheck] = useState(event.isDone);
  const { deleteEvent, isLoading: isDeleting } = useDeleteEvent();
  const { toggleCheckBox, isLoading: isUpdating } = useUpdateEvent();

  function handlClickCheckBox(e) {
    // console.log("click");
    setIsCheck((prev) => !prev);
    console.log(event);
    const newData = { ...event, isDone: e.target.checked };
    toggleCheckBox(newData);
  }

  function handleDelete() {
    console.log(event);
    deleteEvent(event.id);
  }

  if (isDeleting || isUpdating) return <SpinnerLoader />;

  return (
    <StyledEvent>
      <Modal>
        <Modal.OpenButton openWindowName="delete">
          <DeleteEvent>
            <HiXMark></HiXMark>
          </DeleteEvent>
        </Modal.OpenButton>
        <StyleLabel>
          <StyleContent $isdone={event.isDone}>{event.eventContent}</StyleContent>
          {isUpdating ? (
            <SpinnerLoader />
          ) : (
            <StyledInput type="checkbox" defaultChecked={isCheck} onClick={(e) => handlClickCheckBox(e)} />
          )}
        </StyleLabel>

        <Modal.Window name="delete">
          <ComfirmBox title="確定要刪除？" comfirmedFn={handleDelete}></ComfirmBox>
        </Modal.Window>
      </Modal>
    </StyledEvent>
  );
};

export default Event;
