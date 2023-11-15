import {
  SettingsLayout,
  SettingHeader,
  SettingSideBar,
  SettingContent,
  StyledNavLink,
  SmallButton,
} from "../ui/SettingLayoutUI";
import { Outlet } from "react-router-dom";
import { HiLockClosed, HiLockOpen, HiOutlineHome } from "react-icons/hi2";
import { BiBed, BiDetail } from "react-icons/bi";
import { useState, createContext } from "react";
import useQuerySettings from "../features/settings/useQuerySettings";

export const SettingContext = createContext();

const Settings = () => {
  const { data: settings, isLoading } = useQuerySettings();
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <SettingsLayout>
      <SettingContext.Provider value={{ settings, isLoading, isEditMode, setIsEditMode }}>
        <SettingHeader>
          一般設定
          {!isEditMode ? (
            <SmallButton onClick={() => setIsEditMode(true)}>
              <HiLockClosed />
              <p>開啟編輯</p>
            </SmallButton>
          ) : (
            <SmallButton onClick={() => setIsEditMode(false)}>
              <HiLockOpen />
              <p>關閉編輯</p>
            </SmallButton>
          )}
        </SettingHeader>
        <SettingSideBar>
          <li>
            <StyledNavLink to="contact">
              <HiOutlineHome />
              旅館相關
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="housekeeping">
              <BiBed />
              房務相關
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="other">
              <BiDetail />
              其他設定
            </StyledNavLink>
          </li>
        </SettingSideBar>
        <SettingContent>
          <Outlet></Outlet>
        </SettingContent>
      </SettingContext.Provider>
    </SettingsLayout>
  );
};

export default Settings;
