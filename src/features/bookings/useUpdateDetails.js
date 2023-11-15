import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateBooking } from "../../servicesApi/apiBooking";

export default function useUpdateDetails() {
  const queryClent = useQueryClient();
  const { mutate: update, isLoading } = useMutation({
    mutationFn: (newData) => updateBooking(newData),
    onSuccess: () => {
      queryClent.invalidateQueries("booking");
      toast.success("成功上傳資料");
    },
    onError: (err) => toast.error(`資料修改失敗..${err.message}`),
  });
  return { update, isLoading };
}
