import { useQuery } from "@tanstack/react-query";
import { QueryUser } from "../../servicesApi/apiLoginout";

export default function useUser() {
  const { data, isLoading, error } = useQuery({
    queryFn: QueryUser,
    queryKey: ["user"],
  });
  return { data, isLoading, error };
}
