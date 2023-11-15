import { useQuery } from "@tanstack/react-query";
import { queryBooking } from "../../servicesApi/apiBooking";
import { useSearchParams } from "react-router-dom";

export default function useQueryBookings() {
  const [searchParams] = useSearchParams();

  const statusFilter = searchParams.get("status");
  const isPaidFilter = searchParams.get("isPaid");

  const { data, isLoading, error } = useQuery({
    queryFn: () => queryBooking(statusFilter, isPaidFilter),
    queryKey: ["booking", statusFilter, isPaidFilter],
  });
  return { data, isLoading, error };
}
