import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import useClickOutSide from "../hooks/useClickOutSide";

const Menu = styled.div`
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: flex-end; */
  /* position: relative; */
`;

const StyledToggleButton = styled.button`
  border: none;
  background-color: none;
  padding: 1rem;
  border-radius: 1rem;
`;

const StyledList = styled.ul`
  border-radius: 1rem;
  position: absolute;
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 3.5rem;
  padding: 1.75rem 2.5rem;
  border: none;
  &:hover {
    border-radius: 4px;
    background-color: var(--color-grey-300);
  }

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

const MenuContext = createContext();

const Menus = ({ children }) => {
  const [openId, openIdFn] = useState("");
  const [position, setPosition] = useState({});
  function closeFn() {
    return openIdFn("");
  }

  return (
    <MenuContext.Provider value={{ openId, openIdFn, closeFn, position, setPosition }}>
      {children}
    </MenuContext.Provider>
  );
};

function ToggleButton({ id }) {
  const { openId, openIdFn, closeFn, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();

    const toggleButtonPosition = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - toggleButtonPosition.right + toggleButtonPosition.width + 2,
      y: toggleButtonPosition.top,
    });

    openId === "" || openId !== id ? openIdFn(id) : closeFn();
  }

  return (
    <StyledToggleButton onClick={handleClick}>
      <HiEllipsisHorizontal />
    </StyledToggleButton>
  );
}

function List({ id, children }) {
  const { openId, closeFn, position } = useContext(MenuContext);

  const ref = useClickOutSide(closeFn);

  if (openId !== id) return null;
  return (
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>
  );
}

function Button({ children, icon, onClickFn }) {
  const { closeFn } = useContext(MenuContext);

  function handleClick() {
    onClickFn?.();
    closeFn();
  }
  return (
    <StyledButton onClick={handleClick}>
      {icon}
      {children}
    </StyledButton>
  );
}

Menus.Menu = Menu;
Menus.ToggleButton = ToggleButton;
Menus.List = List;
Menus.Button = Button;

export default Menus;
