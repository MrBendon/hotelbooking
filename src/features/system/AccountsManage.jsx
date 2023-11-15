import { useContext } from "react";
import { SystemContext } from "../../page/System";
import SettingForm from "../../ui/SettingForm";
import { useForm } from "react-hook-form";

const AccountsManage = () => {
  const { register, handleSubmit } = useForm();
  const { isEditMode } = useContext(SystemContext);
  return (
    <SettingForm>
      {/* <SettingForm.RowTitle>帳號名稱:</SettingForm.RowTitle>
      <SettingForm.Input disabled={!isEditMode} />
      <SettingForm.RowTitle>帳號名稱:</SettingForm.RowTitle>
      <SettingForm.Input disabled={!isEditMode} /> */}
    </SettingForm>
  );
};

export default AccountsManage;
