import { useQuery } from "@tanstack/react-query";
import { QueryGuests } from "../../servicesApi/apiBooking";

export default function useQueryGuests() {
  const { data, isLoading, error } = useQuery({
    queryFn: QueryGuests,
    queryKey: ["guests"],
  });
  return { data, isLoading, error };
}
