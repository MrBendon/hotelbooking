import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateRoomData } from "../../servicesApi/apiRooms";

export function useEditRoom() {
  const queryClent = useQueryClient();
  const { mutate: editRoom, isLoading } = useMutation({
    mutationFn: (data) => {
      console.log(data);
      updateRoomData(data);
    },
    onSuccess: () => {
      toast.success("資料修改成功", {
        position: toast.POSITION.TOP_CENTER,
      });
      queryClent.invalidateQueries("rooms");
    },
    onError: (error) => toast.error(`資料修改失敗，請再試一次(${error.message})`),
  });
  return { isLoading, editRoom };
}
