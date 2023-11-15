import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addBed as addBedApi } from "../../servicesApi/apiBooking";

export default function useAddBed() {
  const QueryClient = useQueryClient();
  const { mutate: addBed, isLoading } = useMutation({
    mutationFn: (newData) => addBedApi(newData),
    onSuccess: () => {
      QueryClient.invalidateQueries("booking");
      toast.success("加床成功");
    },
    onError: (err) => toast.error(err.message),
  });
  return { addBed, isLoading };
}
