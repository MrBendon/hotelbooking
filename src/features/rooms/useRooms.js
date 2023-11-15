import { useQuery } from "@tanstack/react-query";
import { getRoomsData } from "../../servicesApi/apiRooms";

export function useRooms() {
  const { data, isLoading, error } = useQuery({
    queryFn: getRoomsData,
    queryKey: ["rooms"],
    onError: (error) => console.log(error.message),
  });

  return { data, isLoading, error };
}
