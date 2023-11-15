import { useRef, useState } from "react";
import styled from "styled-components";
import { HiSearch } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { device } from "../styles/RWDPointSettings";

const BarBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  & svg {
    width: 2.5rem;
    height: 2.5rem;
    transition: all 0.25s;
    cursor: pointer;
    &:hover {
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(2px);
    }
  }
`;

const StyledInput = styled.input.attrs({ type: "search" })`
  width: ${(props) => (props.open ? "23rem" : 0)};
  border: none;
  height: 3rem;
  background-color: var(--color-grey-200);
  border-bottom: 1px solid grey;
  transition: all 0.35s;
  padding: ${(props) => (props.open ? "1rem" : 0)};
  &:focus {
    border-radius: 5px;
    outline: 2px solid #2095fb;
  }

  ${device.tablet} {
    width: ${(props) => (props.open ? "19rem" : 0)};
  }
  ${device.mobileL} {
    width: ${(props) => (props.open ? "14rem" : 0)};
  }
`;

const InputSearch = ({ searchString, setSearchString }) => {
  const [openSearchBar, setOpenSearchBar] = useState(searchString ? true : false);
  const [searchParams, setSearchParams] = useSearchParams();
  const InputRef = useRef();
  // useEffect(() => {
  //   const handleClickOutSide = (e) => {
  //     if (InputRef.current && !InputRef.current.contains(e.target)) {
  //       console.log("Click OutSide");
  //       // setOpenSearchBar(false);
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutSide);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutSide);
  //   };
  // }, []);

  function handleOnChange(e) {
    if (e.key === "Enter") {
      console.log(e.target.value);
      setSearchString(e.target.value.trim());
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }

  function handleOnBlur(e) {
    console.log(e.target.value);
    if (e.target.value === "") {
      setOpenSearchBar(false);
    }
    setSearchString(e.target.value.trim());
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <BarBox ref={InputRef}>
      <HiSearch onClick={() => setOpenSearchBar((prev) => !prev)} />
      <StyledInput
        defaultValue={searchString}
        open={openSearchBar}
        onKeyDown={handleOnChange}
        onBlur={handleOnBlur}
        placeholder="請輸入搜索姓名"
      />
    </BarBox>
  );
};

export default InputSearch;
