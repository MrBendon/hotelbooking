import { useQuery } from "@tanstack/react-query";
import { QueryBulletin } from "../../servicesApi/apiDashboard";

export default function useQueryBulletin() {
  const { data, isLoading } = useQuery({
    queryFn: QueryBulletin,
    queryKey: ["bulletin"],
  });
  return { data, isLoading };
}
