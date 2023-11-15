import styled from "styled-components";
import { device } from "../styles/RWDPointSettings";

const BackgroundDiv = styled.div`
  width: 100dvw;
  height: 100dvh;
  background-image: linear-gradient(45deg, #e66465, #9198e5);
  display: flex;
  align-items: center;
  justify-content: center;

  ${device.tablet} {
    padding: 1.5rem;
  }
`;

const PageLayout = styled.div`
  width: 1200px;
  border: 1px solid var(--color-grey-200);
  border-radius: 1rem;
  background-color: #ebebeb;
  display: grid;
  grid-template-columns: 3fr 2fr;
  padding: 1.5rem;
  gap: 2rem;

  ${device.tablet} {
    display: flex;
    flex-direction: column;
    max-height: 80rem;
  }
`;

export default function LoginPageLayout({ children }) {
  return (
    <BackgroundDiv>
      <PageLayout>{children}</PageLayout>
    </BackgroundDiv>
  );
}
