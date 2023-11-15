import { useQuery } from "@tanstack/react-query";
import { querySettings } from "../../servicesApi/apiSettings";

export default function useQuerySettings() {
  const { data, isLoading } = useQuery({
    queryFn: querySettings,
    queryKey: ["settings"],
    onError: (error) => console.log(error),
  });
  return { data, isLoading };
}
