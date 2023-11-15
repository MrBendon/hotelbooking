import styled, { css } from "styled-components";

const type = {
  add: css`
    background-color: var(--color-blue);
    font-weight: 500;
    color: white;
    transition: all 0.25s;

    &:hover {
      background-color: var(--color-blue-hover);
      transform: translateY(-2px);
    }

    &:active {
      outline: none;
      transform: translateY(2px);
    }
    &:focus {
      outline: none;
    }
    & svg {
      color: white;
    }
  `,
  goback: css`
    background-color: var(--color-grey-50);
  `,
  pure: css`
    background-color: transparent;
    & svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  `,
  paginationButton: css`
    opacity: ${(props) => (props.notshow ? 0 : 1)};
    padding: 1rem 0.75rem;
    background-color: white;
    transition: all 0.25s;
    cursor: ${(props) => (props.notshow ? "auto" : "pointer")};

    & svg {
      width: 1.5rem;
      height: 1.5rem;
    }
    &:focus {
      outline: none;
    }
    &:hover {
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(2px);
    }
  `,
};

const StyledButtonIcon = styled.button`
  border: none;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;

  &:focus {
    outline: 1px solid var(--color-brand-600);
  }

  &:hover {
    background-color: var(--color-grey-200);
  }

  &:active {
    outline: none;
  }

  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-brand-600);
  }

  ${(props) => type[props.type]}
`;

function ButtonIcon({ children, onClick, type, notshow }) {
  return (
    <StyledButtonIcon
      type={type}
      notshow={notshow}
      onClick={onClick}
      disabled={notshow === "true" ? true : false}
    >
      {children}
    </StyledButtonIcon>
  );
}

export default ButtonIcon;
