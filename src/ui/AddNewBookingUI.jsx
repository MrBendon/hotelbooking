import styled from "styled-components";
import { device } from "../styles/RWDPointSettings";

export const AddSectionForm = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: ${(props) => (props.backgroundcolor ? props.backgroundcolor : "var(--color-grey-100)")};
  padding: 2rem;
  gap: 2rem;
  border-radius: 5px;
  align-items: center;

  ${device.tablet} {
    display: flex;
    flex-direction: column;
  }
`;

export const InputBox = styled.div`
  grid-column: span ${(props) => props.span || 1};
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 0.3fr;
  align-items: center;

  ${device.tablet} {
    width: 100%;
  }
`;

export const InfoRow = styled.div`
  grid-column: span ${(props) => props.span || 1};
  display: ${(props) => (props.flex ? "flex" : null)};
  justify-content: ${(props) => props.justifycontent};
`;

export const ErrorMessage = styled.span`
  height: 2.5rem;
  opacity: ${(props) => (props.haserror ? 1 : 0)};
  transform: ${(props) => (props.haserror ? "translateY(0)" : " translateY(-.5rem)")};
  transition: all 0.5s;
  color: red;
`;

export const Footer = styled.div`
  grid-column: span 2;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 3rem;
`;

export const HintSuper = styled.sup`
  color: red;
  font-size: 1rem;
`;

export const HintSub = styled.sub`
  color: var(--color-grey-400);
  font-size: 1rem;
`;
export const SytledLine = styled.div`
  grid-column: span 2;
  height: 1px;
  border-bottom: 1px dashed grey;
`;
export const StyledDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: var(--color-grey-200);
  border-radius: 5px;
  padding: 2rem;
  gap: 2rem;
  align-items: center;
`;
