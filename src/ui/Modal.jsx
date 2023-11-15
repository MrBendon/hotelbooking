import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { device } from "../styles/RWDPointSettings";
import useClickOutSide from "../hooks/useClickOutSide";

const StyledModal = styled.div`
  position: fixed;
  /* width: 100%; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 5rem;
  transition: all 1s;
  z-index: 1001;

  ${device.tablet} {
    width: max-content;
    padding: 2rem;
  }
`;

const BlurBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: rgba(247, 247, 247, 0.813);
  transition: all 0.35s;
  z-index: 1000;

  &::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: 1px solid grey;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  &:active {
    outline: none;
  }
`;

const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return <ModalContext.Provider value={{ openName, open, close }}>{children}</ModalContext.Provider>;
};

function OpenButton({ openWindowName, children }) {
  const { open } = useContext(ModalContext);
  function handleClick() {
    // console.log(`open ${openWindowName}`);
    open(openWindowName);
  }
  return cloneElement(children, { onClick: () => handleClick() });
}

function CloseButton({ children }) {
  const { close } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => close() });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const Ref = useClickOutSide(close);
  if (name !== openName) return null;
  return createPortal(
    <BlurBackGround>
      <StyledModal ref={Ref}>
        {cloneElement(children, { onCloseModal: close })}
        {/* {children} */}
        <Button onClick={close}>
          <HiXMark />
          Close
        </Button>
      </StyledModal>
    </BlurBackGround>,
    document.body
  );
}
Modal.OpenButton = OpenButton;
Modal.CloseButton = CloseButton;
Modal.Window = Window;

export default Modal;
