import { useForm } from "react-hook-form";
import SettingForm from "../../ui/SettingForm";
import Button from "../../ui/Button";
// import useQuerySettings from "./useQuerySettings";
import Spinner from "../../ui/Spinner";
import { useContext } from "react";
import { SettingContext } from "../../page/Settings";
import useUpdateSetting from "./useUpdateSetting";

const ContactForm = () => {
  const { isEditMode, settings, isLoading } = useContext(SettingContext);
  console.log(isEditMode);
  const { update, isLoading: isUpdating } = useUpdateSetting();
  console.log(settings);
  const { register, handleSubmit, reset, getValues } = useForm();

  if (isLoading || isUpdating) return <Spinner />;

  const onSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...settings,
      hotelAddress: getValues("hotelAddress") || settings.hotelAddress,
      contactPerson: getValues("contactPerson") || settings.contactPerson,
      hotelTel: getValues("hotelTel") || settings.hotelTel,
      hotelFax: getValues("hotelFax") || settings.hotelFax,
      hotelEmail: getValues("hotelEmail") || settings.hotelEmail,
    };
    console.log(newData);
    update(newData);
  };

  return (
    <SettingForm>
      <SettingForm.RowTitle>旅館地址</SettingForm.RowTitle>
      <SettingForm.Input
        disabled={!isEditMode}
        type="text"
        {...register("hotelAddress")}
        defaultValue={settings.hotelAddress}
      />
      <SettingForm.RowTitle>旅館聯絡人</SettingForm.RowTitle>
      <SettingForm.Input
        disabled={!isEditMode}
        type="text"
        {...register("contactPerson")}
        defaultValue={settings.contactPerson}
      />
      <SettingForm.RowTitle>旅館聯絡電話</SettingForm.RowTitle>
      <SettingForm.Input
        disabled={!isEditMode}
        type="text"
        {...register("hotelTel")}
        defaultValue={settings.hotelTel}
      />
      <SettingForm.RowTitle>旅館傳真</SettingForm.RowTitle>
      <SettingForm.Input
        disabled={!isEditMode}
        type="text"
        {...register("hotelFax")}
        defaultValue={settings.hotelFax}
      />
      <SettingForm.RowTitle>旅館Email</SettingForm.RowTitle>
      <SettingForm.Input
        disabled={!isEditMode}
        type="email"
        {...register("hotelEmail")}
        defaultValue={settings.hotelEmail}
      />
      {isEditMode && (
        <SettingForm.Footer>
          <Button
            type="cancel"
            onClick={() =>
              reset({
                hotelAddress: settings.hotelAddress,
                contactPerson: settings.contactPerson,
                hotelTel: settings.hotelTel,
                hotelFax: settings.hotelFax,
                hotelEmail: settings.hotelEmail,
              })
            }
          >
            取消修改
          </Button>
          <Button type="submit" onClick={(e) => handleSubmit(onSubmit(e))}>
            確認修改
          </Button>
        </SettingForm.Footer>
      )}
    </SettingForm>
  );
};
// privacyPolicy
export default ContactForm;
