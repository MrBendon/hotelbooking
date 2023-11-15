import styled, { css } from "styled-components";
import { device } from "../styles/RWDPointSettings";

const types = {
  cancel: css`
    font-size: 1.5rem;
    padding: 1.25rem 2.75rem;
    color: white;
    font-weight: 600;
    background-color: #a1aaad;

    &:hover {
      background-color: #7e898d;
    }
  `,

  confirm: css`
    font-size: 1.5rem;
    padding: 1.25rem 2.75rem;
    background-color: var(--color-blue);
    font-weight: 600;
    color: white;

    &:hover {
      background-color: var(--color-blue-hover);
    }
  `,
  submit: css`
    font-size: 1.5rem;
    padding: 1.25rem 2.75rem;
    background-color: var(--color-blue);
    font-weight: 600;
    color: white;

    &:hover {
      background-color: var(--color-blue-hover);
    }
  `,
  skip: css`
    font-size: 1.5rem;
    padding: 1.25rem 2.75rem;
    background-color: var(--color-blue);
    font-weight: 600;
    color: white;

    &:hover {
      background-color: var(--color-blue-hover);
    }
  `,
  delete: css`
    font-size: 1.5rem;
    padding: 1.25rem 2.75rem;
    background-color: var(--color-red-800);
    font-weight: 600;
    color: white;

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  notReceviedAllPayment: css`
    width: 8rem;
    border-radius: 2px;
    padding: 0.5rem 1rem;
    color: white;
    background-color: #d13e11;
    border: 1px solid var(--color-grey-100);

    ${device.laptop} {
      width: 6rem;
      padding: 0.5rem;
    }
  `,
  receviedAllPayment: css`
    width: 8rem;
    border-radius: 2px;
    padding: 0.5rem 1rem;
    color: white;
    background-color: var(--color-grey-300);
    border: 1px solid var(--color-grey-100);
    ${device.laptop} {
      width: 6rem;
      padding: 0.5rem;
    }
  `,

  addservice: css`
    font-size: 1.5rem;
    padding: 0.25rem 1.25rem;
    color: white;
    background-color: var(--color-blue);

    &:hover {
      background-color: var(--color-blue-hover);
    }
  `,

  addserviceDisabled: css`
    font-size: 1.5rem;
    padding: 0.25rem 1.25rem;
    color: white;
    background-color: var(--color-grey-300);
  `,

  filterButton: css`
    font-size: 1.5rem;
    padding: 0.25rem 1.25rem;
    color: white;
    background-color: var(--color-grey-400);
    border-radius: 5px;
    &:hover {
      transform: none;
      background-color: var(--color-grey-500);
    }
    &:active {
      transform: none;
      background-color: var(--color-blue-active);
    }
  `,
  activeFilterButton: css`
    font-size: 1.5rem;
    padding: 0.25rem 1.25rem;
    color: white;
    transform: none;
    background-color: var(--color-blue-active);
    border-radius: 5px;
  `,
  addEvent: css`
    font-size: 1.5rem;
    width: 100%;
    padding: 0.5rem 1.75rem;
    color: white;
    background-color: var(--color-blue);
    border-radius: 15px;
    &:hover {
      background-color: var(--color-blue-active);
    }
  `,
};

const sizes = {
  small: css`
    font-size: 1rem;
    padding: 0.25rem 0.75rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.5rem;
    padding: 1rem 2rem;
    font-weight: 500;
  `,
};
//
const colors = {
  blue: css`
    color: white;
    background-color: #2368c9;

    &:hover {
      background-color: #247bf3;
    }
  `,

  red: css`
    color: white;
    background-color: red;

    &:hover {
      background-color: #c73f3f;
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: 10px;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(2px);
  }
  &:focus {
    outline: none;
  }
  ${(props) => types[props.type]}
  ${(props) => sizes[props.size]}
  ${(props) => colors[props.color]}
`;

export default Button;
