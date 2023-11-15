import { useState } from "react";
import styled from "styled-components";
import Event from "./Event";
import { HiOutlineComputerDesktop, HiOutlineCog8Tooth, HiOutlineHome } from "react-icons/hi2";

const StyledCategory = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: 3rem 1fr 3rem;
  gap: 0.5rem;
  transition: all 0.35s;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: var(--color-grey-50);
    color: var(--color-blue);
  }
  &:hover span {
    color: var(--color-blue);
  }
`;

const ChildrenBox = styled.div`
  max-height: ${(props) => (props.open ? "40rem" : 0)};
  opacity: ${(props) => (props.open ? 1 : 0.75)};
  /* transform: ${(props) => (props.open ? "translateY(0)" : "translateY(-3px)")}; */
  overflow: hidden;
  transition: all 0.5s;
`;

const CategoryName = styled.span`
  color: var(--color-grey-500);
`;

const icons = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  room: <HiOutlineHome></HiOutlineHome>,
  other: <HiOutlineCog8Tooth></HiOutlineCog8Tooth>,
  counter: <HiOutlineComputerDesktop></HiOutlineComputerDesktop>,
};

const SylteNumber = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ee8282;
  border-radius: 50%;
  /* background-color: var(--color-grey-200); */
  /* color: var(--color-grey-500); */
  color: #ffffff;
`;

const StyledEmptySpan = styled.span`
  padding-left: 3rem;
  color: var(--color-grey-300);
`;

const EventCategory = ({ index, categoryName, numitems, data }) => {
  const [openChildren, setOpenChildren] = useState();
  // console.log(data);

  return (
    <>
      <StyledCategory>
        <span>{icons[index]}</span>

        <CategoryName open={openChildren} onClick={() => setOpenChildren((prev) => !prev)}>
          {categoryName}
        </CategoryName>

        {numitems !== 0 && <SylteNumber>{numitems}</SylteNumber>}
      </StyledCategory>

      <ChildrenBox open={openChildren}>
        {data.length === 0 ? (
          <StyledEmptySpan>無事件</StyledEmptySpan>
        ) : (
          data.map((item) => <Event key={item.id} event={item} />)
        )}
      </ChildrenBox>
    </>
  );
};

export default EventCategory;
