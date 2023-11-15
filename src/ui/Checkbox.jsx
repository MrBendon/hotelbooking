import styled from "styled-components";

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  & input[type="checkbox"] {
    height: 2rem;
    width: 2rem;
  }

  & label {
    font-size: 1.25rem;
  }
`;

function Checkbox({ id, checked, children, onChange, disabled = false }) {
  return (
    <StyledCheckbox>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} disabled={disabled} />
      <label htmlFor={!disabled ? id : ""}>{children}</label>
    </StyledCheckbox>
  );
}

export default Checkbox;
