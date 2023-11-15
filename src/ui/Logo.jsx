import styled from "styled-components";
import { device } from "../styles/RWDPointSettings";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 10rem;
  width: auto;
  border-radius: 50%;

  ${device.tablet} {
  }
`;

const Logo = () => {
  const src = "/logo.png";
  return (
    <StyledLogo>
      <Img src={src} alt="Logo"></Img>
    </StyledLogo>
  );
};

export default Logo;
