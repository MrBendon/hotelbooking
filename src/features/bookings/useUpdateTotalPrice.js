import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateTotalPrice as updateTotalPriceApi } from "../../servicesApi/apiBooking";

export default function useUpdateTotalPrice() {
  const queryClent = useQueryClient();
  const { mutate: updateTotalPrice, isLoading } = useMutation({
    mutationFn: (priceData) => updateTotalPriceApi(priceData),
    onSuccess: () => {
      toast.success("已更新價格");
      queryClent.invalidateQueries("booking");
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateTotalPrice, isLoading };
}
