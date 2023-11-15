import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../servicesApi/apiSystem";
import { toast } from "react-toastify";

export default function useUpadteUserData() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: (newData) => updateUserData(newData),
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      toast.success("成功更新帳號資料");
    },
    onError: (error) => toast.error(error),
  });
  return { updateUser, isLoading };
}
