import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addNewBooking } from "../../servicesApi/apiBooking";

export default function useAddNewBooking() {
  const queryClient = useQueryClient();
  const {
    mutate: upLoadNewBooking,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (newData) => addNewBooking(newData),
    onSuccess: () => {
      queryClient.invalidateQueries("bookings");
      toast.success("已成功上傳新訂單");
    },
    onError: () => toast.error("無法上傳新訂單，請再試一次"),
  });
  return { upLoadNewBooking, isLoading, isSuccess };
}
