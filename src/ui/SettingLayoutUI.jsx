import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { device } from "../styles/RWDPointSettings";

export const SettingsLayout = styled.div`
  background-color: var(--color-grey-100);
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 1rem;
  padding: 2rem;
  /* overflow: hidden; */
`;
export const SettingHeader = styled.header`
  grid-column: 1/-1;
  font-weight: 600;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SettingSideBar = styled.ul`
  grid-column: 1/2;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: white;
  border-radius: 1rem;
  ${device.tablet} {
    padding: 1rem 0.25rem;
  }
`;

export const SettingContent = styled.div`
  grid-column: 2/-1;
`;

export const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    background-color: transparent;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    position: relative;
    color: var(--color-grey-400);
    transition: all 0.3s;
    gap: 2rem;
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    background-color: var(--color-brand-600);
    width: 0px;
    height: 100%;
    border-radius: 5px;
    transition: all 0.2s;
  }

  &:hover,
  &:active,
  &.active:visited,
  &.active:link {
    background-color: var(--color-grey-100);
    color: var(--color-grey-800);
    font-weight: 600;
  }

  &.active svg {
    color: var(--color-brand-600);
  }

  &.active::after {
    width: 4px;
  }
`;

export const SmallButton = styled.button`
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 1px solid grey;

  &:hover {
    color: var(--color-grey-0);
    background-color: var(--color-grey-600);
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:focus {
    outline: none;
  }
`;
