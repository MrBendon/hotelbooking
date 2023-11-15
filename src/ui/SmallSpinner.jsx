import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const SpinnerWrapper = styled.div`
  color: official;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const SpinnerDot = styled.div`
  transform-origin: 40px 40px;
  animation: ${spinAnimation} 1.2s linear infinite;

  &:after {
    content: " ";
    display: block;
    position: absolute;
    top: 3px;
    left: 37px;
    width: 6px;
    height: 18px;
    border-radius: 20%;
    background: #fff;
  }
`;

const SmallSpinner = () => {
  return (
    <SpinnerWrapper className="lds-spinner">
      {[...Array(12).keys()].map((index) => (
        <SpinnerDot
          key={index}
          style={{ transform: `rotate(${index * 30}deg)`, animationDelay: `${-1.1 + 0.1 * index}s` }}
        />
      ))}
    </SpinnerWrapper>
  );
};

export default SmallSpinner;
