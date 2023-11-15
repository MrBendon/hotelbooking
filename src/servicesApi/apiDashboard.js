import supabase from "./supabase";

export async function QueryBulletin() {
  let { data, error } = await supabase.from("bulletin").select("*");

  if (error) throw new Error("無法獲得事件列表");
  return data;
}

export async function updateBulletinBoolean(newData) {
  const { data, error } = await supabase
    .from("bulletin")
    .update({ isDone: newData.isDone })
    .eq("id", newData.id)
    .select();

  if (error) throw new Error("事件更新失敗");

  return data;
}

export async function addNewEvent(newData) {
  // console.log(newData);
  const { data, error } = await supabase
    .from("bulletin")
    .insert([{ ...newData }])
    .select();

  if (error) throw new Error("新增事件失敗");
  return data;
}

export async function deleteEvent(id) {
  const { error } = await supabase.from("bulletin").delete().eq("id", id);

  if (error) throw new Error("刪除事件失敗");
}
