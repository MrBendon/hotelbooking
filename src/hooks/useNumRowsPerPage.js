import { useQuery } from "@tanstack/react-query";
import { queryNumRowsPerPage } from "../servicesApi/apiSystem";

export default function useNumRowsPerPage() {
  const { data, isLoading, error } = useQuery({
    queryFn: queryNumRowsPerPage,
    queryKey: ["NumRowsPerPage"],
  });
  const NumRowsPerPage = data?.at(0).NumRowsPerPage;
  if (error) return { NumRowsPerPage: 10, isLoading };

  return { NumRowsPerPage, isLoading };
}
