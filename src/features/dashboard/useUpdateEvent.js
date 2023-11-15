import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBulletinBoolean } from "../../servicesApi/apiDashboard";

export default function useUpdateEvent() {
  const queryClient = useQueryClient();
  const { mutate: toggleCheckBox, isLoading } = useMutation({
    mutationFn: (newData) => updateBulletinBoolean(newData),
    onSuccess: () => {
      queryClient.invalidateQueries("bulletin");
    },
  });
  return { toggleCheckBox, isLoading };
}
