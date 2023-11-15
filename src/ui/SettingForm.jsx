import styled from "styled-components";
import { device } from "../styles/RWDPointSettings";

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: ${(props) => (props.templaterow ? "repeat(3, 1fr 0.3fr)" : null)};
  border-radius: 1rem;
  background-color: white;
  padding: 2rem;
  gap: 3rem;
  align-items: center;

  ${device.tablet} {
    padding: 1rem;
    gap: 2rem;
    grid-template-columns: 1fr 3fr;
  }
`;

const Span = styled.span`
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 1px solid grey;
  &:focus {
    background-color: #e5f3ff;
    outline: 2px solid #0075e2;
  }
`;

const CommonDiv = styled.div`
  display: grid;
  grid-template-rows: ${(props) => (props.templaterow ? "1fr 0.3fr" : null)};
`;

const StyledFooter = styled.div`
  grid-column: 1/-1;
  /* background-color: #014cae; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3rem;
`;

const SettingForm = ({ children, templaterow, SubmitFn }) => {
  return (
    <Form templaterow={templaterow} onSubmit={SubmitFn}>
      {children}
    </Form>
  );
};

const RowTitle = ({ children }) => {
  return <Span>{children}</Span>;
};

const Footer = ({ children }) => {
  return <StyledFooter>{children}</StyledFooter>;
};

SettingForm.RowTitle = RowTitle;
SettingForm.Input = Input;
SettingForm.Footer = Footer;
SettingForm.TwoRowDiv = CommonDiv;

export default SettingForm;
