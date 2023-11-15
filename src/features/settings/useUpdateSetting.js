import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../../servicesApi/apiSettings";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: update, isLoading } = useMutation({
    mutationFn: (data) => updateSettings(data),
    onSuccess: () => {
      //   queryClient.invalidateQueries();
      queryClient.invalidateQueries("settings");
      console.log("更新成功");
    },
    onError: (err) => console.log(err.message, "更新失敗"),
  });
  return { update, isLoading };
}
