import styled from "styled-components";

const StyledErrorMessage = styled.div`
  height: 2rem;
  opacity: ${(props) => (props.$haserror ? 1 : 0)};
  transform: ${(props) => (props.$haserror ? "translateY(0)" : " translateY(-0.5rem)")};
  transition: all 0.5s;
  color: red;
`;

const ErrorMessage = ({ error = {} }) => {
  console.log(error);
  const hasError = Object.keys(error).length > 0;
  console.log(hasError);
  return <StyledErrorMessage $haserror={hasError}> {error.message}</StyledErrorMessage>;
};

export default ErrorMessage;
