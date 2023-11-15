import styled, { keyframes } from "styled-components";
import { device } from "../styles/RWDPointSettings";

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }

`;

const StyledRollerDiv = styled.div`
  width: 24px;
  height: 24px;
  border: 5px solid #e9e9e9;
  border-top-color: black;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: ${rotation} 1.5s linear infinite;

  ${device.tablet} {
    width: 18px;
    height: 18px;
  }
`;

const SpinnerLoader = () => {
  return <StyledRollerDiv></StyledRollerDiv>;
};

export default SpinnerLoader;
