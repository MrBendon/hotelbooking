import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addNewGuest as addNewGuestApi } from "../../servicesApi/apiBooking";

export default function useAddNewGuest() {
  const {
    data,
    mutate: addNewGuest,
    isSuccess,
    status,
    isLoading,
  } = useMutation({
    mutationFn: (newGuestData) => addNewGuestApi(newGuestData),
    onSuccess: () => {
      console.log(isSuccess);
      console.log(status);
      toast.success("新增客戶資料成功");
    },
    onError: () => toast.error(`資料上傳失敗...`),
    onSettled: () => {
      console.log(isSuccess);
      console.log(status);
    },
  });

  return { data, addNewGuest, isSuccess, isLoading };
}
