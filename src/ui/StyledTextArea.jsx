import styled from "styled-components";

const StyledTextArea = styled.textarea`
  border-radius: 3px;
  border: 1px solid grey;
  padding: 0.5rem;
  &:focus {
    outline: 2px solid var(--color-blue);
  }
`;

export default StyledTextArea;
