import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoomData } from "../../servicesApi/apiRooms";
import { toast } from "react-toastify";

export function useCreateRoom() {
  const queryClent = useQueryClient();
  const {
    mutate: createNewData,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (data) => createRoomData(data),
    onSuccess: () => {
      toast.success("資料上傳完成 👌");
      queryClent.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("資料上傳失敗，請再試一次 🤯");
    },
  });

  return { createNewData, error, isLoading };
}
