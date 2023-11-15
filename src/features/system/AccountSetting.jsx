import { useContext, useState } from "react";
import { SystemContext } from "../../page/System";
import SettingForm from "../../ui/SettingForm";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import useUser from "../log-in-out/useUser";
import ErrorMessage from "../../ui/ErrorMessage";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import useUpadteUserData from "./useUpdateUserData";

const CommonDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const Image = styled.img`
  height: 5rem;
  aspect-ratio: 1/1;
  border-radius: 10px;
`;

const Span = styled.span`
  color: var(--color-grey-400);
  font-size: 0.75rem;
`;

const AccountSetting = () => {
  const { data: User, isLoading: isLoadingUser } = useUser();
  console.log(User);
  const [previewPhotos, setPreviewPhotos] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: User?.user_metadata.userName || User?.email.split("@").at(0),
    },
  });
  const { isEditMode, setIsEditMode } = useContext(SystemContext);
  const { updateUser, isLoading: isUpdating } = useUpadteUserData();

  const handleOnSubmit = (data, e) => {
    console.log(1);
    console.log(data);
    e.preventDefault();

    updateUser(data);
    setIsEditMode(false);
  };

  function handleAddPhoto(e) {
    const newPhotos = e.target.files[0];
    console.log(newPhotos);
    // 圖片預覽
    let reader = new FileReader();
    reader.readAsDataURL(newPhotos);
    reader.onload = function (e) {
      console.log(e);
      //reader完成圖片載入後在e.target.result會有url的結果
      setPreviewPhotos(e.target.result);
    };
  }

  if (isLoadingUser || isUpdating) return <Spinner />;

  return (
    <SettingForm SubmitFn={handleSubmit(handleOnSubmit)}>
      <SettingForm.TwoRowDiv>
        <SettingForm.RowTitle>帳號名稱:</SettingForm.RowTitle>
        <Span>預設為email</Span>
      </SettingForm.TwoRowDiv>

      <SettingForm.TwoRowDiv>
        <SettingForm.Input
          {...register("userName", { required: true })}
          disabled={!isEditMode}
          defaultValue={User?.user_metadata.userName || User?.email.split("@").at(0)}
        />

        <ErrorMessage error={errors.userName?.type}></ErrorMessage>
      </SettingForm.TwoRowDiv>

      <SettingForm.RowTitle>帳號頭像:</SettingForm.RowTitle>
      <CommonDiv>
        {previewPhotos ? <Image src={previewPhotos} alt="" /> : null}
        <SettingForm.Input
          {...register("avatars")}
          type="file"
          disabled={!isEditMode}
          accept="image/png, image/jpeg"
          onChange={handleAddPhoto}
        />
      </CommonDiv>

      {isEditMode && (
        <SettingForm.Footer>
          <Button type="submit">確認修改</Button>
        </SettingForm.Footer>
      )}
    </SettingForm>
  );
};

export default AccountSetting;
