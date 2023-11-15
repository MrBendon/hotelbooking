import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addPerson as addPersonApi } from "../../servicesApi/apiBooking";

export default function useAddPerson() {
  const QueryClient = useQueryClient();
  const { mutate: addPerson, isLoading } = useMutation({
    mutationFn: (newData) => addPersonApi(newData),
    onSuccess: () => {
      QueryClient.invalidateQueries("booking");
      toast.success("加人頭成功");
    },
    onError: (err) => toast.error(err.message),
  });
  return { addPerson, isLoading };
}
