import styled from "styled-components";
import { device } from "../styles/RWDPointSettings";

export const Form = styled.form`
  padding: 2rem;
  width: 100rem;
  max-height: 50rem;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(2, 1fr 2fr);
  gap: 5rem;
  align-items: center;

  ${device.laptop} {
    width: 80rem;

    gap: 3rem;
    /* margin-top: 2rem; */
  }

  ${device.tablet} {
    display: flex;
    flex-direction: column;
    width: 45rem;
    max-height: 50rem;
    gap: 3rem;
    margin-top: 2rem;
    /* padding: 1.5rem; */
  }

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-blue);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--color-grey-200);
    border-radius: 10px;
  }

  &::-moz-scrollbar {
    width: 12px;
  }

  &::-moz-scrollbar-thumb {
    background-color: var(--color-blue-700);
    border-radius: 10px;
  }
  &::-moz-scrollbar-track {
    background-color: var(--color-grey-200);
  }
`;
export const Header = styled.h3`
  grid-column: 1/-1;
  font-size: 3rem;
  display: flex;
  justify-content: center;
`;
export const Label = styled.label`
  grid-column: span ${(props) => (props.colSpan ? props.colSpan : 1)};
  grid-row: span ${(props) => (props.rowSpan ? props.rowspan : 1)};
`;
export const Box = styled.div`
  grid-column: span ${(props) => props.colSpan || 2};
  grid-row: span 2;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 0.3fr;
  column-gap: 5rem;
`;
export const FormFooter = styled.div`
  grid-column: 1/-1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3rem;
`;
export const InputFullRow = styled.div`
  grid-column: 2/-1;
  padding: 0.75rem;
  display: grid;
  row-gap: 3rem;
  column-gap: 3rem;
  grid-template-columns: repeat(${(props) => props.columnset}, 1fr 1.8fr);
  align-items: center;
`;
export const FirstColLabel = styled.div`
  grid-column: 1/2;
`;
export const CommonInput = styled.input`
  grid-column: span ${(props) => (props.span ? props.span : 1)};
  padding: 0.75rem;
  border: 1px solid grey;
  border-radius: 6px;
  &:focus {
    outline: 2px solid #1c7ded;
  }
`;
export const StyledTextInput = styled(CommonInput).attrs({ type: "text" })``;
export const StyledNumberInput = styled(CommonInput).attrs({ type: "number" })`
  /* width: 100%; */
  &::-webkit-inner-spin-button {
    transform: scale(2);
    opacity: 0.5;
  }
`;
export const Radio = styled.input.attrs({ type: "radio" })`
  width: 3rem;
  &:focus {
    outline: none;
  }
`;
export const StyledTextArea = styled.textarea.attrs({ rows: 5 })`
  grid-column: 2/-1;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid grey;
  &:focus {
    outline: 2px solid #1c7ded;
  }

  ${device.tablet} {
    width: 100%;
    min-height: 10rem;
  }
`;
export const PhotoRow = styled.div`
  grid-column: span 3;
  display: flex;
  gap: 3rem;
  align-items: center;
  flex-wrap: wrap;
`;
export const ImageBox = styled.div`
  width: 15rem;
  position: relative;
`;
export const Image = styled.img`
  width: 15rem;
  /* height: 10rem; */
  border-radius: 6px;
  aspect-ratio: 3/2;
  object-fit: cover;
  overflow: hidden;
`;
export const PlusPhoto = styled.input.attrs({ type: "file" })`
  /* width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 2px solid grey;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  &:hover {
    background-color: var(--color-grey-200);
  } */
`;
export const DeletePhotoButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #ececec;
  border: none;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #b1b1b1;
  }
`;
export const AddLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 3px;
  color: white;
  padding: 0.5rem 1rem;
  background-color: var(--color-blue);
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    transform: translateY(-2px);
    background-color: var(--color-blue-hover);
  }
  &:active {
    transform: translateY(2px);
  }
`;
