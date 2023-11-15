import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewEvent } from "../../servicesApi/apiDashboard";

export default function useAddNewEvent() {
  const queryClient = useQueryClient();
  const { mutate: add, isLoading } = useMutation({
    mutationFn: (newData) => addNewEvent(newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["bulletin"]);
    },
    onerror: (error) => console.log(error),
  });
  return { add, isLoading };
}
