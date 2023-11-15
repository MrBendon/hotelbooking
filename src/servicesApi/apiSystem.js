import { getRandomNumberByDateNow, getRandomString } from "../utils/helpers";
import supabase, { supabaseUrl } from "./supabase";

export async function queryNumRowsPerPage() {
  let { data, error } = await supabase.from("system").select("*");

  if (error) throw new Error("無法取得「每頁最大展示列數」");

  return data;
}

export async function changeNumRowsPerPage(NewNum) {
  console.log(NewNum);
  const { data, error } = await supabase
    .from("system")
    .update({ NumRowsPerPage: NewNum })
    .eq("id", 1)
    .select();

  if (error) throw new Error("更新 「 每頁展示列數 」失敗");
  return data;
}

export async function updateUserData(newData) {
  console.log(newData);

  //如果有上傳圖片
  if (newData.avatars) {
    //創建不重複的亂數檔名
    const FileName = getRandomString() + "_" + getRandomNumberByDateNow();
    //擷取副檔名
    const FileExtension = newData.avatars[0].name.split(".").at(-1);
    //檔案內容
    const avatarFile = newData.avatars[0];

    const { data: img, error: upLoadImageError } = await supabase.storage
      .from("staffAvatars")
      .upload(`${FileName}.${FileExtension}`, avatarFile, {
        cacheControl: "3600",
        upsert: false,
      });
    if (upLoadImageError) throw new Error("圖片上傳失敗");

    if (!img) {
      console.log(img);
    }

    const imagePath = `${supabaseUrl}/storage/v1/object/public//staffAvatars/${FileName}.${FileExtension}`;
    //上傳更新資料
    const { data, error } = await supabase.auth.updateUser({
      data: { userName: newData.userName, avatarsPath: imagePath },
    });

    if (error) throw new Error("帳號資料更新失敗");
    return data;
  } else {
    //若沒有圖片，僅上傳更新資料
    const { data, error } = await supabase.auth.updateUser({
      data: { userName: newData.userName },
    });

    if (error) throw new Error("帳號資料更新失敗");
    return data;
  }

  // https://qzvlabepqzdmhfihotwy.supabase.co/storage/v1/object/public/staffAvatars/cabin-001.jpg
}
