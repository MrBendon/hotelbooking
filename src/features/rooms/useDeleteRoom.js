import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteRoomData } from "../../servicesApi/apiRooms";

export function useDeleteRoom() {
  const queryClent = useQueryClient();
  const {
    mutate: deleteData,
    isSuccess,
    isLoading,
  } = useMutation({
    mutationFn: (room) => deleteRoomData(room),
    onSuccess: () => {
      queryClent.invalidateQueries({
        queryKey: ["rooms"],
      });
      toast.success("成功刪除");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("刪除失敗..");
    },
  });
  return { deleteData, isSuccess, isLoading };
}
