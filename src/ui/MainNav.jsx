import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiComputerDesktop,
} from "react-icons/hi2";
import { device, mediaQueries } from "../styles/RWDPointSettings";

const StyledNavUL = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyleNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    font-size: 2rem;
    font-weight: 500;
    transition: all 0.3s;
    padding: 0.5rem 1.5rem;
    color: var(--color-grey-400);

    ${device.laptop} {
      font-size: 1.75rem;
    }

    ${device.tablet} {
      font-size: 1.5rem;
    }
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;

    ${mediaQueries("laptopL")} {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const MainNav = ({ setIsHideNav }) => {
  function handleClick() {
    setIsHideNav(true);
  }
  return (
    <nav>
      <StyledNavUL>
        <li>
          <StyleNavLink to="/" onClick={handleClick}>
            <HiOutlineHome /> <span>首頁 Dashboard</span>
          </StyleNavLink>
        </li>
        <li>
          <StyleNavLink to="/bookings" onClick={handleClick}>
            <HiOutlineCalendarDays /> <span>訂單管理 Bookings</span>
          </StyleNavLink>
        </li>{" "}
        <li>
          <StyleNavLink to="/rooms" onClick={handleClick}>
            <HiOutlineHomeModern /> <span>房型設定 Rooms</span>
          </StyleNavLink>
        </li>{" "}
        <li>
          <StyleNavLink to="/settings" onClick={handleClick}>
            <HiOutlineCog6Tooth /> <span>一般設定 Settings</span>
          </StyleNavLink>
        </li>{" "}
        <li>
          <StyleNavLink to="/system" onClick={handleClick}>
            <HiComputerDesktop /> <span>系統設定 System</span>
          </StyleNavLink>
        </li>
      </StyledNavUL>
    </nav>
  );
};

export default MainNav;
