import styled from "styled-components";

const StyledSelect = styled.select`
  border-radius: 3px;
  border: 1px solid ${(props) => (props.haserror ? "red" : "grey")};
  padding: 0.5rem;

  &:focus {
    outline: 2px solid var(--color-blue);
  }
`;

export default StyledSelect;
