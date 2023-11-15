import styled from "styled-components";

const StyledIconTextButton = styled.button`
  text-align: left;
  background: none;
  border: ${(props) => (props.disabled ? "none" : "1px solid var(--color-grey-400)")};
  border-radius: 1rem;
  padding: 1.5rem 2.5rem;
  transition: all 0.2s;
  color: ${(props) => (props.disabled ? "white" : "var(--color-grey-700)")};
  background-color: ${(props) => (props.disabled ? "var(--color-grey-300)" : "transparent")};
  display: flex;
  align-items: center;
  gap: 1.5rem;

  &:active {
    outline: none;
  }

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const IconTextButton = ({ icon, children, onClick, disabled = false }) => {
  return (
    <StyledIconTextButton onClick={onClick} disabled={disabled}>
      {icon}
      {children}
    </StyledIconTextButton>
  );
};

export default IconTextButton;
