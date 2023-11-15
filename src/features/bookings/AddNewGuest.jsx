import { useForm } from "react-hook-form";
import useAddNewGuest from "./useAddNewGuest";
import StyledInput from "../../ui/StyledInput";
import StyledSelect from "../../ui/StyledSelect";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useEffect } from "react";
import { AddSectionForm, InputBox, InfoRow, ErrorMessage, Footer, HintSuper } from "../../ui/AddNewBookingUI";

const AddNewGuest = ({ setNowStep, setNewGuestId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: addResult, addNewGuest, isSuccess, isLoading } = useAddNewGuest();
  console.log("errors:", errors);

  function handleChangeGender(e) {
    console.log(e.target.value);
  }

  function handleSubmitGuest(data) {
    console.log(data);
    addNewGuest(data);
  }

  function handleSkip() {
    setNowStep((prev) => prev + 1);
  }

  useEffect(() => {
    console.log("addResult:", addResult);
    console.log("isSuccess:", isSuccess);
    if (isSuccess) {
      setNewGuestId(addResult.at(0).id);
      setNowStep((prev) => prev + 1);
    }
  }, [isSuccess, addResult, setNowStep, setNewGuestId]);

  if (isLoading) return <Spinner />;

  return (
    <AddSectionForm onSubmit={handleSubmit(handleSubmitGuest)}>
      <InfoRow as={"h2"} span={2}>
        新增客戶資訊
      </InfoRow>

      <InfoRow span={2} as={"h4"}>
        <span>
          <HintSuper>*</HintSuper> 為必填項目
        </span>
      </InfoRow>

      <InputBox>
        <InfoRow>
          <HintSuper>*</HintSuper> 客戶姓名：
        </InfoRow>
        <StyledInput type="text" {...register("fullName", { required: true })} />
        <span></span>
        <ErrorMessage haserror={errors.fullName}>{errors.fullName?.type}</ErrorMessage>
      </InputBox>

      <InputBox>
        <label>
          <HintSuper>*</HintSuper> 身分證字號/護照號碼：
        </label>
        <StyledInput type="text" {...register("nationalID", { required: true })} />
        <span></span>
        <ErrorMessage haserror={errors.nationalID}>{errors.nationalID?.type}</ErrorMessage>
      </InputBox>

      <InputBox>
        <label>
          <HintSuper>*</HintSuper> 性別：
        </label>
        <StyledSelect {...register("gender", { required: true })} onChange={(e) => handleChangeGender(e)}>
          <option value="">請選擇</option>
          <option value="male">男性</option>
          <option value="female">女性</option>
        </StyledSelect>
        <span></span>
        <ErrorMessage haserror={errors.gender}>{errors.gender?.type}</ErrorMessage>
      </InputBox>

      <InputBox>
        <label>客戶電話：</label>
        <StyledInput type="tel" {...register("phoneNumber")} />
        <span></span>
        <ErrorMessage>1</ErrorMessage>
      </InputBox>

      <InputBox>
        <label>
          <HintSuper>*</HintSuper> 電子信箱：
        </label>
        <StyledInput type="email" {...register("email", { required: true })} />
        <span></span>
        <ErrorMessage haserror={errors.email}>{errors.email?.type}</ErrorMessage>
      </InputBox>

      <InputBox>
        <label>國籍ＩＤ：</label>
        <StyledInput type="text" {...register("nationalCode")} />
        <span></span>
        <ErrorMessage>1</ErrorMessage>
      </InputBox>

      <InputBox>
        <label>
          <HintSuper>*</HintSuper> 國家名稱：
        </label>
        <StyledInput type="text" {...register("nationality", { required: true })} />
        <span></span>
        <ErrorMessage haserror={errors.nationality}>{errors.nationality?.type}</ErrorMessage>
      </InputBox>

      <Footer>
        <Button type="skip" onClick={() => handleSkip()}>
          略過，使用資料庫客戶資料
        </Button>
        <Button type="submit">新增客戶資訊</Button>
      </Footer>
    </AddSectionForm>
  );
};

export default AddNewGuest;
