import { useForm } from "react-hook-form";
import useNumRowsPerPage from "../../hooks/useNumRowsPerPage";
import Button from "../../ui/Button";
import SettingForm from "../../ui/SettingForm";
import Spinner from "../../ui/Spinner";
import useChangeNumRowsPerPage from "./useChangeBookingNumRowsPerPage";
import { useContext } from "react";
import { SystemContext } from "../../page/System";

const SystemInterface = () => {
  const { register, handleSubmit } = useForm();
  const { NumRowsPerPage, isLoading } = useNumRowsPerPage();
  const { ChangeNumRowsPerPage, isLoading: isUpdating } = useChangeNumRowsPerPage();
  const { isEditMode } = useContext(SystemContext);
  //   console.log(isEditMode);
  if (isLoading || isUpdating) return <Spinner />;

  function handleClickSubmit(data) {
    // console.log(data);
    ChangeNumRowsPerPage(Number(data.NumRowsPerPage));
  }

  return (
    <SettingForm>
      <SettingForm.RowTitle>訂單管理每頁顯示資料列數</SettingForm.RowTitle>
      <SettingForm.Input
        disabled={!isEditMode}
        {...register("NumRowsPerPage")}
        defaultValue={NumRowsPerPage}
        type="number"
        max={10}
        min={3}
      />
      {isEditMode && (
        <SettingForm.Footer>
          <Button type="submit" onClick={handleSubmit(handleClickSubmit)}>
            確定修改
          </Button>
        </SettingForm.Footer>
      )}
    </SettingForm>
  );
};

export default SystemInterface;
