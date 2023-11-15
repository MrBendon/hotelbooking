import { useContext } from "react";
import SettingForm from "../../ui/SettingForm";
import { SettingContext } from "../../page/Settings";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import useUpdateSetting from "./useUpdateSetting";

const HousekeepingForm = () => {
  const { isEditMode, settings, isLoading } = useContext(SettingContext);
  const { register, reset, handleSubmit, getValues } = useForm();
  const { update, isLoading: isUpdating } = useUpdateSetting();

  if (isLoading || isUpdating) return <Spinner></Spinner>;

  const onSubmit = (e) => {
    e.preventDefault();
    const newSettings = {
      ...settings,
      checkInTime: getValues("checkInTime") || settings.checkInTime,
      checkOutTime: getValues("checkOutTime") || settings.checkOutTime,
      breakfastPrice: getValues("breakfastPrice") || settings.breakfastPrice,
      mealTime: getValues("mealTime") || settings.mealTime,
    };
    console.log(newSettings);
    update(newSettings);
  };

  return (
    <SettingForm>
      <SettingForm.RowTitle>Check in時間</SettingForm.RowTitle>
      <SettingForm.Input
        disabled={!isEditMode}
        type="text"
        defaultValue={settings.checkInTime}
        {...register("checkInTime")}
      />
      <SettingForm.RowTitle>Check Out時間</SettingForm.RowTitle>
      <SettingForm.Input
        disabled={!isEditMode}
        type="text"
        defaultValue={settings.checkOutTime}
        {...register("checkOutTime")}
      />
      <SettingForm.RowTitle>早餐價格</SettingForm.RowTitle>
      <SettingForm.Input
        disabled={!isEditMode}
        type="number"
        defaultValue={settings.breakfastPrice}
        {...register("breakfastPrice")}
      />
      <SettingForm.RowTitle>用餐時間</SettingForm.RowTitle>
      <SettingForm.Input
        disabled={!isEditMode}
        type="text"
        defaultValue={settings.mealTime}
        {...register("mealTime")}
      />
      {isEditMode && (
        <SettingForm.Footer>
          <Button type="cancel" onClick={() => reset()}>
            取消
          </Button>
          <Button type="confirm" onClick={(e) => handleSubmit(onSubmit(e))}>
            確定修改
          </Button>
        </SettingForm.Footer>
      )}
    </SettingForm>
  );
};
export default HousekeepingForm;
