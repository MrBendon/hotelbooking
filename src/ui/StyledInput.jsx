import styled from "styled-components";

const StyledInput = styled.input.attrs((props) => ({
  type: props.inputtype || "text",
}))`
  border-radius: 3px;
  padding: ${(props) => props.pedding || "0.5rem"};
  border: 1px solid ${(props) => (props.haserror ? "red" : "grey")};

  &::-webkit-inner-spin-button {
    transform: scale(2);
    opacity: 0.5;
  }

  &:focus {
    outline: 2px solid var(--color-blue);
  }
`;

export default StyledInput;
