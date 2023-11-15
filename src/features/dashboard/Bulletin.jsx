import styled from "styled-components";
import Button from "../../ui/Button";
import EventCategory from "../../ui/EventCategory";
import useQueryBulletin from "./useQueryBulletin";
import Spinner from "../../ui/Spinner";
import AddnewEvent from "./AddnewEvent";
import { useState } from "react";
import { DescIsDoneByBoolean } from "../../utils/helpers";
import { device } from "../../styles/RWDPointSettings";

const StyledBulletin = styled.div`
  height: calc(100dvh - 15rem);
  border-radius: 1rem;
  padding: 1rem;
  /* background-color: #f2e2f0; */
  display: grid;
  /* gap: 1rem; */
  grid-template-rows: 5rem 1fr 5rem;

  ${device.tablet} {
    height: max-content;
  }
`;

const Header = styled.header`
  width: 100%;
`;

const Section = styled.section`
  width: 100%;
  /* height: 100%; */
  /* background-color: #a9c9e2; */
  padding-right: 1.5rem;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: purple green;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #d5d5d5;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #39a1ce;
    border-radius: 10px;
  }
`;

const StyledFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Bulletin = () => {
  const { data, isLoading } = useQueryBulletin();
  // console.log(data);
  const [isOpenAddBox, setIsOpenAddBox] = useState(false);
  //   const result = new Set()

  //   const categoryArray = [...new Set(data?.map((item) => item.eventCategory))];
  const roomData = DescIsDoneByBoolean(data?.filter((item) => item.categoryName === "room"));
  const otherData = DescIsDoneByBoolean(data?.filter((item) => item.categoryName === "other"));
  const counterData = DescIsDoneByBoolean(data?.filter((item) => item.categoryName === "counter"));

  //   const categoryArray = [
  //     ...new Set(data?.map((item) => ({ categoryName: item.categoryName, categoryLabel: item.eventCategory }))),
  //   ];

  //   console.log(categoryArray);
  if (isLoading) return <Spinner />;
  return (
    <StyledBulletin>
      <Header>
        <h4>Bulletin 佈告欄</h4>
      </Header>
      <Section>
        <EventCategory
          index="room"
          categoryName="房務"
          data={roomData}
          numitems={roomData?.filter((item) => item.isDone === false).length}
        ></EventCategory>

        <EventCategory
          index="other"
          categoryName="其他"
          data={otherData}
          numitems={otherData?.filter((item) => item.isDone === false).length}
        ></EventCategory>
        <EventCategory
          index="counter"
          categoryName="櫃檯"
          data={counterData}
          numitems={counterData?.filter((item) => item.isDone === false).length}
        ></EventCategory>
        <AddnewEvent isOpen={isOpenAddBox} setIsOpen={setIsOpenAddBox}></AddnewEvent>
        {/* {categoryArray.map((category, index) => (
          <EventCategory
            key={category}
            index={index}
            categoryName={category}
            numitems={
              data?.filter((data) => data.eventCategory === category).filter((item) => item.isDone === false)
                .length
            }
            data={data?.filter((data) => data.eventCategory === category)}
          />
        ))} */}
        {/* <EventCategory>
          <Event>12</Event>
          <Event>12</Event>
        </EventCategory>
        <EventCategory>
          <Event>33</Event>
          <Event>3</Event>
        </EventCategory> */}
      </Section>
      <StyledFooter>
        <Button type="addEvent" onClick={() => setIsOpenAddBox(true)}>
          新增
        </Button>
      </StyledFooter>
    </StyledBulletin>
  );
};

export default Bulletin;
