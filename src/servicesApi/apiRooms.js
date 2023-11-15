import { toast } from "react-toastify";
import supabase from "./supabase";

export async function getRoomsData() {
  let { data, error } = await supabase.from("rooms").select("*");

  if (error) throw new Error(error.message);

  return data;
}

// export async function createRoomData(newRoom) {

// console.log(newRoom)

//   //上傳圖片
//   for (const photo of newRoom.roomPhotos) {
//     // console.log(photo);
//     const { error: storageError } = await supabase.storage
//       .from("roomsPhotos")
//       .upload(`${photo.folderName}/${photo.name}`, photo.file);
//     if (!storageError) toast.success("圖片上傳成功 👌");
//     if (storageError) {
//       throw new Error("圖片上傳失敗...");
//     }
//   }

//   //將圖片修正成上傳路徑
//   const onlyPhotoURL = newRoom.roomPhotos.map((photo) => {
//     return photo.url;
//   });

//   // 因為新增的資料其id欄位supabase會自動產生，不需要我們給
//   const { id, ...newRoomWhitoutId } = newRoom;
//   console.log(id);
//   //上傳資料內容
//   const { error: upLoadError } = await supabase
//     .from("rooms")
//     .insert([{ ...newRoomWhitoutId, roomPhotos: onlyPhotoURL }])
//     .select();
//   if (upLoadError) throw new Error(upLoadError.message);
// }

export async function createRoomData(newRoom) {
  // console.log(newRoom);

  let toastId = "theToast";
  toast.info("開始上傳圖片...", {
    type: toast.TYPE.INFO,
    autoClose: false,
    toastId,
  });

  const totalPhoto = newRoom.roomPhotos.length;
  let counter = 0;
  const onlyPhotoURL = await Promise.all(
    newRoom.roomPhotos.map(async (photo) => {
      const { data, error: photoUploadError } = await supabase.storage
        .from("roomsPhotos")
        .upload(`${photo.folderName}/${photo.name}`, photo.file);
      console.log(data);
      counter++;
      if (!photoUploadError)
        toast.update(toastId, {
          render: `上傳進度：${counter}/${totalPhoto}`,
          type: toast.TYPE.INFO,
          autoClose: false,
        });

      return photo.url;
    })
  );

  toast.update(toastId, {
    render: "所有圖片上傳完成 👍",
    type: toast.TYPE.INFO,
    autoClose: 5000,
  });

  // 因為新增的資料其id欄位supabase會自動產生，不需要我們給
  const { id, ...newRoomWhitoutId } = newRoom;
  console.log(id);
  //上傳資料內容

  const { error: upLoadError } = await supabase
    .from("rooms")
    .insert([{ ...newRoomWhitoutId, roomPhotos: onlyPhotoURL }])
    .select();

  if (upLoadError) throw new Error(upLoadError.message);
  if (!upLoadError) toast.success("資料上傳成功 👍", { autoClose: 5000 });
}

export async function updateRoomData(dataset) {
  const toastId = "TheToast";
  toast.info("上傳更新資料..", {
    toastId,
  });
  let photoUpdateError = false;
  const { newData: newRoomData, oldData: oldRoomPhotos } = dataset;
  //上傳圖片
  console.log(oldRoomPhotos);
  const upLoadImages = newRoomData.roomPhotos
    .map((photo) => {
      if (!photo.name) return;
      return photo;
    })
    .filter((item) => item !== undefined);
  // console.log(upLoadImages);

  const onlyPhotoURL = newRoomData.roomPhotos.map((photo) => {
    return photo.url ? photo.url : photo;
  });
  // console.log(onlyPhotoURL);
  const totalupLoadImages = upLoadImages.length;
  let counter = 0;
  for (const photo of upLoadImages) {
    // console.log(photo);
    const { error: storageError } = await supabase.storage
      .from("roomsPhotos")
      .upload(`${photo.folderName}/${photo.name}`, photo.file);

    if (storageError) {
      console.log(storageError, "圖片上傳失敗...");
      photoUpdateError = true;
      throw new Error("圖片上傳失敗...");
    }
    counter++;
    toast.update(toastId, {
      render: `上傳新圖片${counter}/${totalupLoadImages}`,
    });
  }

  if (photoUpdateError) throw new Error("圖片上傳失敗...");
  if (!photoUpdateError) toast.update(toastId, { render: "圖片更新完畢" });
  //上傳更新資料
  const { error: updateDataError } = await supabase
    .from("rooms")
    .update({ ...newRoomData, roomPhotos: onlyPhotoURL })
    .eq("id", newRoomData.id)
    .select();

  if (updateDataError) {
    console.log(updateDataError);
    throw new Error("資料更新失敗...");
  }
}

export async function deleteRoomData(room) {
  // console.log("delete", room.id);

  const { error: deleteDataError } = await supabase.from("rooms").delete().eq("id", room.id);

  const photoFileNum = room.roomPhotos.at(0).split("/room_").at(1);
  // console.log(photoFileNum);

  const { data: photoDataList, error: PhotoDataListError } = await supabase.storage
    .from("roomsPhotos")
    .list(`room_${photoFileNum}`, {
      limit: 1000,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

  if (PhotoDataListError) console.log(PhotoDataListError.message);

  for (const photo of photoDataList) {
    const { error: deletePhotoError } = await supabase.storage
      .from("roomsPhotos")
      .remove([`room_${photoFileNum}/${photo.name}`]);

    if (deletePhotoError) console.log("相片資料庫刪除失敗");
  }
  if (deleteDataError) throw new Error("刪除失敗...");
}

export async function queryBucketFolderList() {
  const { data, error } = await supabase.storage.from("roomsPhotos").list("", {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });
  // console.log("roomsPhotos底下的資料夾清單：", data);
  return { data, error };
}

export async function queryFolderLastFileName(folderName) {
  const { data, error } = await supabase.storage.from("roomsPhotos").list(`${folderName}`, {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });
  if (error) throw new Error("資料庫中沒有這個資料夾 或 無法查詢該資料夾中的檔案");
  // console.log(data);
  return { data, error };
}

export async function queryAllRoomsName() {
  let { data: rooms, error } = await supabase.from("rooms").select("*");

  // console.log(rooms);
  const dataObject = rooms?.map((room) => ({
    roomId: room.id,
    roomName: room.name,
    numRooms: room.numRooms,
  }));
  // console.log(dataObject);
  if (error) throw new Error("無法取得房間名稱列表");

  return dataObject;
}
