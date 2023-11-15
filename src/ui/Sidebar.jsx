import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Hamburger from "./hamburger";
import { device } from "../styles/RWDPointSettings";
import { useState } from "react";
import useClickOutSide from "../hooks/useClickOutSide";
// import { mediaQueries } from "../styles/RWDPointSettings";
// import { useEffect } from "react";
// import useCalcWindowSize from "../styles/useCalcWindowSize";

const StyledSidebar = styled.div`
  display: grid;
  grid-column: 1/2;
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  transition: all 0.25s;

  ${device.tablet} {
    background-color: white;
    width: 20rem;
    height: 100dvh;
    position: fixed;
    top: 0;
    left: ${(props) => (props.$isHideNav ? "-20rem" : "0")};
    z-index: 3;
    border-right: 1px solid var(--color-grey-100);
  }
`;
const Sidebar = () => {
  const [isHideNav, setIsHideNav] = useState(true);
  const ref = useClickOutSide(close);
  function close() {
    setIsHideNav(true);
  }
  return (
    <StyledSidebar $isHideNav={isHideNav} ref={ref}>
      <Logo />
      <MainNav setIsHideNav={setIsHideNav} />
      {isHideNav && <Hamburger setIsHideNav={setIsHideNav} />}
    </StyledSidebar>
  );
};

export default Sidebar;
