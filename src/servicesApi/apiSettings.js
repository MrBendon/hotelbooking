import { toast } from "react-toastify";
import supabase from "./supabase";

export async function querySettings() {
  let {
    data: [settings],
    error,
  } = await supabase.from("settings").select("*");

  if (error) {
    toast.error("無法取得資料..");
    throw new Error(error.message);
  }

  return settings;
}

export async function updateSettings(newData) {
  console.log(newData);

  const { error } = await supabase
    .from("settings")
    .update({ ...newData })
    .eq("id", newData.id)
    .select();

  if (error) {
    toast.error("資料更新失敗..");
    throw new Error(error.message);
  }
}
