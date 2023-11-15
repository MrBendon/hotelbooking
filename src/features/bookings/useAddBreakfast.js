import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addBreakfast as addBreakfastApi } from "../../servicesApi/apiBooking";

export default function useAddBreakfast() {
  const queryClent = useQueryClient();
  const { mutate: addBreakfast, isLoading } = useMutation({
    mutationFn: (id) => addBreakfastApi(id),
    onSuccess: () => {
      toast.success("已新增早餐");
      queryClent.invalidateQueries("booking");
    },
    onError: (err) => toast.error(err.message),
  });
  return { addBreakfast, isLoading };
}
