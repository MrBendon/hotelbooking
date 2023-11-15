import { useQuery } from "@tanstack/react-query";
import { queryAllRoomsName } from "../../servicesApi/apiRooms";

export default function useQueryAllRoomsName() {
  const { data, isLoading } = useQuery({
    queryFn: queryAllRoomsName,
    queryKey: ["AllRoomsName"],
  });
  return { data, isLoading };
}
