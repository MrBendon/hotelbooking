import { useQuery } from "@tanstack/react-query";
import { queryBreakfastPrice } from "../../servicesApi/apiBooking";

export default function useBreakfastPrice() {
  const { data, isLoading } = useQuery({
    queryFn: queryBreakfastPrice,
    queryKey: ["breakfastPrice"],
  });
  return { data, isLoading };
}
