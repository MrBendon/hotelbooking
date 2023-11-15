import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Pay } from "../../servicesApi/apiBooking";

export default function usePay() {
  const queryClient = useQueryClient();
  const {
    mutate: pay,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (payData) => Pay(payData),
    onSuccess: () => {
      queryClient.invalidateQueries("bookings");
      toast.success("已完成付款");
    },
    onError: (err) => {
      console.log(err);
      toast.error("付款失敗");
    },
  });
  return { pay, isLoading, error };
}
