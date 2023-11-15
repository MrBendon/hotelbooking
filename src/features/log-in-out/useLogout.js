import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../servicesApi/apiLoginout";
import { toast } from "react-toastify";

export default function useLogout() {
  const navigate = useNavigate();
  const {
    mutate: logout,
    isLoading,
    error,
  } = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      navigate("/login");
    },
    onError: () => toast.error("登出失敗"),
  });
  return { logout, isLoading, error };
}
