import styled from "styled-components";
import { device } from "../styles/RWDPointSettings";

const StyledHamburgerContainer = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0.75rem;
  left: 1rem;
  cursor: pointer;

  ${device.desktop} {
    display: none;
  }

  ${device.tablet} {
    display: flex;
  }

  &:hover div::before {
    top: -1.15rem;
  }

  &:hover div::after {
    top: 1.5rem;
  }
`;

const HamburgerMenu = styled.div`
  width: 90%;
  height: 50%;
  border-bottom: 2px solid grey;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: -0.75rem;
    left: 0;
    width: 100%;
    height: 100%;
    border-bottom: 2px solid grey;
    transition: all 0.3s;
  }
  &::after {
    content: "";
    position: absolute;
    top: 1.15rem;
    left: 0;
    width: 100%;
    height: 100%;
    border-bottom: 2px solid grey;
    transition: all 0.2s;
  }
`;

const Hamburger = ({ setIsHideNav }) => {
  function handleClick() {
    setIsHideNav((prev) => !prev);
  }
  return (
    <StyledHamburgerContainer>
      <HamburgerMenu onClick={handleClick} />
    </StyledHamburgerContainer>
  );
};

export default Hamburger;
