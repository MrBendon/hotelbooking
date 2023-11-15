import styled from "styled-components";
import SignInCard from "./SignInCard";
import { device } from "../../styles/RWDPointSettings";

const StyldLoginBox = styled.div`
  background-color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;

  ${device.tablet} {
    max-height: 45rem;
  }
`;

const LoginBox = () => {
  return (
    <StyldLoginBox>
      <SignInCard />
    </StyldLoginBox>
  );
};

export default LoginBox;
