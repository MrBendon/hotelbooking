import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent as deleteEventApi } from "../../servicesApi/apiDashboard";

export default function useDeleteEvent() {
  const queryClient = useQueryClient();
  const { mutate: deleteEvent, isLoading } = useMutation({
    mutationFn: (id) => deleteEventApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["bulletin"]);
    },
    onerror: (error) => console.log(error),
  });
  return { deleteEvent, isLoading };
}
