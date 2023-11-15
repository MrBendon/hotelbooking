import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { changeNumRowsPerPage } from "../../servicesApi/apiSystem";

export default function useChangeNumRowsPerPage() {
  const queryClient = useQueryClient();
  const {
    mutate: ChangeNumRowsPerPage,
    isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (newNum) => changeNumRowsPerPage(newNum),
    onSuccess: () => {
      queryClient.invalidateQueries("NumRowsPerPage");
      toast.success("成功更新");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  return { ChangeNumRowsPerPage, isLoading, error, isSuccess };
}
