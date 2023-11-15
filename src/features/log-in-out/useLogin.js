import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Login } from "../../servicesApi/apiLoginout";

export default function useLogin() {
  const navigate = useNavigate();
  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (data) => Login(data),
    onSuccess: () => {
      // console.log(data);
      //   queryClient.setQueryData(["user"], user.user);
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
      toast.error("登入失敗");
    },
  });
  return { login, isLoading, error };
}
