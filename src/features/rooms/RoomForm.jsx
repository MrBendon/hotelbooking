import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { HiDocumentPlus, HiXMark } from "react-icons/hi2";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ROOM_MAXCAPACITY, ROOM_MINCAPACITY } from "../../utils/constants";
import ErrorMessage from "../../ui/ErrorMessage";
import { supabaseUrl } from "../../servicesApi/supabase";
import useQueryBucketFolderList from "./useQueryBucket";
import { useEditRoom } from "./useEditRoom";
import { getRandomString } from "../../utils/helpers";
import { useCreateRoom } from "./useCreateRoom";
import Spinner from "../../ui/Spinner";
import {
  Form,
  Header,
  Label,
  Box,
  FormFooter,
  InputFullRow,
  FirstColLabel,
  StyledTextInput,
  StyledNumberInput,
  Radio,
  StyledTextArea,
  PhotoRow,
  ImageBox,
  Image,
  PlusPhoto,
  DeletePhotoButton,
  AddLabel,
} from "../../ui/RoomFormUI";
import useClickOutSide from "../../hooks/useClickOutSide";

const RoomForm = ({ room, onCloseModal }) => {
  // console.log("room:", room, "newDataId:", newDataId);
  const RoomRef = useClickOutSide(onCloseModal);
  if (room) console.log(room);
  const { register, handleSubmit, control, formState, getValues } = useForm();
  const { errors } = formState;
  const { isLoading: isUpdating, editRoom } = useEditRoom();
  const { createNewData, isLoading: isCreating } = useCreateRoom();

  // 預覽圖片陣列
  const [previewPhotos, setPreviewPhotos] = useState([]);
  // const roomPhotoArraylength = room ? room.roomPhotos.length : 0;
  // 確定要準備上傳的資料
  const { fields, append, remove } = useFieldArray({
    control,
    name: "roomPhotos",
  });

  //將原本就有的圖片append到fieldsArray
  useEffect(() => {
    remove();
    room?.roomPhotos.forEach((photo) => {
      append({ photo });
    });
  }, [room?.roomPhotos, append, remove]);

  //獲取目前roomsPhotos中資料夾名稱最後的數字
  const { data: bucketFolderList } = useQueryBucketFolderList();
  if (isCreating || isUpdating) return <Spinner />;

  const lastFolderNum = parseInt(bucketFolderList?.data?.at(-1)?.name.replace("room_", ""));
  // console.log(lastFolderNum);

  //查詢目前所使用的ＤＢ中Photo資料夾的id
  const PhotoFolderNum = room
    ? room.roomPhotos.at(0).split("/room_")[1]
    : `${String(lastFolderNum + 1).padStart(3, "0")}`;
  // console.log("目標資料夾數字：", PhotoFolderNum);
  //將資料夾名稱丟進去查詢（但如果空白新增就不用做這件事情）

  //  圖片刪除
  function handleClickPhoto(e, index) {
    e.preventDefault();
    // console.log(index);
    remove(index);
  }

  //新增圖片與預覽
  function handleAddPhoto(e) {
    //e.target.files是上傳後的結果(物件)
    const newPhotos = e.target.files;
    const newPhotoArray = Object.values(newPhotos);
    console.log("新增照片：", newPhotoArray);

    //處理新增檔案後要預覽圖片的部分
    setPreviewPhotos([]);
    Array.from(newPhotos).map((file) => {
      const dot = file.name.lastIndexOf(".");
      const fileExtensionName = file.name.slice(dot + 1);
      const reader = new FileReader();
      reader.onload = function (e) {
        append({ photo: e.target.result, fileExtensionName, file });
        //  result是圖片轉base64的結果
        setPreviewPhotos((newFiles) => [...newFiles, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  }

  function previewPhotoConvertToURLs(photoArray) {
    const Array = photoArray.map((photo, index) => {
      if (photo.photo?.startsWith("https://")) {
        return photo;
      }
      const nameString = getRandomString();
      const nameString2 = getRandomString();
      return {
        ...photo,
        photo: `${supabaseUrl}/storage/v1/object/public/roomsPhotos/room_${PhotoFolderNum}/room_${PhotoFolderNum}_${nameString}${nameString2}.${photo.fileExtensionName}`,
        id: Date.now() + index,
        name: `room_${PhotoFolderNum}_${nameString}${nameString2}.${photo.fileExtensionName}`,
        // name: `room_${PhotoFolderNum}_${index + 1 + lastPhotoNum - room.roomPhotos.length}.${
        //   photo.fileExtensionName
        // }`,
        folderName: `room_${PhotoFolderNum}`,
      };
    });
    console.log(Array);
    return Array;
  }

  if (Object.keys(errors).length !== 0) {
    console.log(Object.keys(errors).length);
    console.log(errors);
  }

  function onSubmit(data, e) {
    e.preventDefault();
    const photoURLArray = previewPhotoConvertToURLs(fields).map((item) => {
      if (!item.name) return item.photo;
      return { file: item.file, url: item.photo, name: item.name, folderName: item.folderName };
    });
    const submitObject = { ...data, roomPhotos: photoURLArray, id: room ? room.id : null };
    const oldRoomData = room ? room.roomPhotos : [];
    console.log("最終提交的表單內容：", submitObject);
    if (room) {
      editRoom({ newData: submitObject, oldData: oldRoomData });
    } else {
      createNewData(submitObject);
    }
    // if(isCreateing) toast.
    onCloseModal();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} ref={RoomRef}>
      <Header>房間編輯</Header>
      <Box>
        <Label>房間名稱</Label>
        <StyledTextInput
          id="name"
          defaultValue={room?.name}
          {...register("name", { required: "這是必填項目" })}
        />
        {errors.name && (
          <>
            <div></div>
            <ErrorMessage error={errors.name} />
          </>
        )}
      </Box>
      <Box>
        <Label>可入住人數</Label>
        <StyledNumberInput
          min={ROOM_MINCAPACITY}
          // min={2}
          max={ROOM_MAXCAPACITY}
          defaultValue={room?.maxCapacity ? room.maxCapacity : ROOM_MAXCAPACITY}
          {...register("maxCapacity", { required: "這是必填項目" })}
        />
        {errors.name && (
          <>
            <div></div>
            <ErrorMessage error={errors.name} />
          </>
        )}
      </Box>
      <Box>
        <Label>房間價格</Label>
        <StyledNumberInput
          defaultValue={room?.regularPrice}
          {...register("regularPrice", { required: "這是必填項目" })}
        />
        {errors.regularPrice && (
          <>
            <div></div>
            <ErrorMessage error={errors.regularPrice} />
          </>
        )}
      </Box>
      <Box>
        <Label>折扣後價格</Label>
        <StyledNumberInput
          defaultValue={room?.discount}
          {...register("discount", {
            required: "這是必填項目",
            validate: (value) => value <= getValues("regularPrice") || "折扣後價格應小於等於房間原始價格",
          })}
        />
        {errors.discount && (
          <>
            <div></div>
            <ErrorMessage error={errors.discount} />
          </>
        )}
      </Box>
      <Box>
        <Label>該房型數量</Label>
        <StyledNumberInput
          defaultValue={room?.numRooms}
          {...register("numRooms", { required: "這是必填項目" })}
        />
        {errors.numRooms && (
          <>
            <div></div>
            <ErrorMessage error={errors.numRooms} />
          </>
        )}
      </Box>
      <Box>
        <Label>房間樓層</Label>
        <StyledTextInput defaultValue={room?.floor} {...register("floor", { required: "這是必填項目" })} />
        {errors.floor && (
          <>
            <div></div>
            <ErrorMessage error={errors.floor} />
          </>
        )}
      </Box>
      <Box>
        <Label>
          房間大小(M<sup>2</sup>)
        </Label>
        <StyledTextInput
          defaultValue={room?.squareMeters}
          {...register("squareMeters", { required: "這是必填項目" })}
        />
        {errors.squareMeters && (
          <>
            <div></div>
            <ErrorMessage error={errors.squareMeters} />
          </>
        )}
      </Box>
      <FirstColLabel>房間特色</FirstColLabel>
      <InputFullRow columnset={2} defaultValue={room?.roomFeatures}>
        <span>房間面向</span>
        <div>
          <Label>
            <Radio
              name="face"
              value="山景"
              defaultChecked={room?.roomFeatures.face === "山景"}
              {...register("roomFeatures.face")}
            />
            山景
          </Label>
          <Label>
            <Radio
              name="face"
              value="海景"
              defaultChecked={room?.roomFeatures.face === "海景"}
              {...register("roomFeatures.face")}
            />
            海景
          </Label>
        </div>
        <span>有無浴缸</span>
        <div>
          <Label>
            <Radio
              name="tub"
              value={true}
              defaultChecked={room?.roomFeatures.hasTub === "true"}
              {...register("roomFeatures.hasTub")}
            />
            有浴缸
          </Label>
          <Label>
            <Radio
              name="tub"
              value={false}
              defaultChecked={room?.roomFeatures.hasTub === "false"}
              {...register("roomFeatures.hasTub")}
            />
            無浴缸
          </Label>
        </div>
        <span>房型大小</span>
        <div>
          <Label>
            <Radio
              name="roomtype"
              value="兩人房"
              defaultChecked={room?.roomFeatures.roomType === "兩人房"}
              {...register("roomFeatures.roomType")}
            />
            兩人房
          </Label>
          <Label>
            <Radio
              name="roomtype"
              value="四人房"
              defaultChecked={room?.roomFeatures.roomType === "四人房"}
              {...register("roomFeatures.roomType")}
            />
            四人房
          </Label>
          <br />
          <Label>
            <Radio
              name="roomtype"
              value="六人房"
              defaultChecked={room?.roomFeatures.roomType === "六人房"}
              {...register("roomFeatures.roomType")}
            />
            六人房
          </Label>
        </div>
        <span>有無陽台</span>
        <div>
          <Label>
            <Radio
              name="balcony"
              value={true}
              defaultChecked={room?.roomFeatures.hasBalcony === "true"}
              {...register("roomFeatures.hasBalcony")}
            />
            有陽台
          </Label>
          <Label>
            <Radio
              name="balcony"
              value={false}
              defaultChecked={room?.roomFeatures.hasBalcony === "false"}
              {...register("roomFeatures.hasBalcony")}
            />
            無陽台
          </Label>
        </div>
        <span>床數</span>
        <div>
          <Label>
            <Radio
              name="numberofbeds"
              value="兩中床"
              defaultChecked={room?.roomFeatures.numberOfBeds === "兩中床"}
              {...register("roomFeatures.numberOfBeds")}
            />
            兩中床
          </Label>
          <Label>
            <Radio
              name="numberofbeds"
              value="三中床"
              defaultChecked={room?.roomFeatures.numberOfBeds === "三中床"}
              {...register("roomFeatures.numberOfBeds")}
            />
            三中床
          </Label>
          <br />
          <Label>
            <Radio
              name="numberofbeds"
              value="一大床"
              defaultChecked={room?.roomFeatures.numberOfBeds === "一中床"}
              {...register("roomFeatures.numberOfBeds")}
            />
            一大床
          </Label>
          <Label>
            <Radio
              name="numberofbeds"
              value="兩大床"
              defaultChecked={room?.roomFeatures.numberOfBeds === "兩大床"}
              {...register("roomFeatures.numberOfBeds")}
            />
            兩大床
          </Label>
        </div>
        <span>有無冰箱</span>
        <div>
          <Label>
            <Radio
              name="refrigerator"
              value={true}
              defaultChecked={room?.roomFeatures.hasRefrigerator === "true"}
              {...register("roomFeatures.hasRefrigerator")}
            />
            有冰箱
          </Label>
          <Label>
            <Radio
              name="refrigerator"
              value={false}
              defaultChecked={room?.roomFeatures.hasRefrigerator === "false"}
              {...register("roomFeatures.hasRefrigerator")}
            />
            無冰箱
          </Label>
        </div>
      </InputFullRow>

      <FirstColLabel>房間描述</FirstColLabel>
      <StyledTextArea
        defaultValue={room?.roomDescription}
        {...register("roomDescription", { required: "這是必填項目" })}
      />
      {errors.roomDescription && (
        <>
          <div></div>
          <InputFullRow>
            <ErrorMessage error={errors.roomDescription} />
          </InputFullRow>
        </>
      )}

      <Label>房間照片</Label>
      <PhotoRow>
        {fields.map((photo, index) => {
          return (
            <ImageBox key={photo.id}>
              <Image src={photo.photo ? photo.photo : photo}></Image>
              <DeletePhotoButton onClick={(e) => handleClickPhoto(e, index)}>
                <HiXMark />
              </DeletePhotoButton>
            </ImageBox>
          );
        })}
        <AddLabel>
          <HiDocumentPlus /> {previewPhotos.length === 0 ? "新增檔案" : "重新選擇檔案"}
          <PlusPhoto onChange={handleAddPhoto} accept="image/png, image/jpeg" multiple hidden />
        </AddLabel>
      </PhotoRow>
      <FormFooter>
        <Modal.CloseButton>
          <Button disabled={isUpdating} type="cancel">
            取消
          </Button>
        </Modal.CloseButton>
        <Button disabled={isUpdating || isCreating} type="submit">
          提交
        </Button>
      </FormFooter>
    </Form>
  );
};

export default RoomForm;
