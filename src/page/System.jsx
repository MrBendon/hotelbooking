import { createContext, useState } from "react";
import {
  SettingsLayout,
  SettingHeader,
  SettingSideBar,
  SettingContent,
  StyledNavLink,
  SmallButton,
} from "../ui/SettingLayoutUI";

import { Outlet } from "react-router-dom";
import { HiLockClosed, HiLockOpen } from "react-icons/hi2";

export const SystemContext = createContext();

const System = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  function toggleIsEditMode() {
    setIsEditMode((prev) => !prev);
  }

  return (
    <SystemContext.Provider value={{ isEditMode, setIsEditMode }}>
      <SettingsLayout>
        <SettingHeader>
          系統設定 System Settings
          <SmallButton onClick={() => toggleIsEditMode()}>
            {!isEditMode ? <HiLockClosed /> : <HiLockOpen />}
            {isEditMode ? "關閉編輯" : "開啟編輯"}
          </SmallButton>
        </SettingHeader>
        <SettingSideBar>
          <StyledNavLink to="systeminterface">系統介面設定</StyledNavLink>
          <StyledNavLink to="accountsetting">帳號設定</StyledNavLink>
          {/* <StyledNavLink to="accountsmanage">帳號管理</StyledNavLink> */}
        </SettingSideBar>
        <SettingContent>
          <Outlet></Outlet>
        </SettingContent>
      </SettingsLayout>
    </SystemContext.Provider>
  );
};

export default System;
