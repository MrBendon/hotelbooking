import { useQuery } from "@tanstack/react-query";
import { queryBucketFolderList } from "../../servicesApi/apiRooms";

const useQueryBucketFolderList = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: queryBucketFolderList,
    queryKey: ["queryBucketFolderList"],
    onError: (error) => console.log(error.message),
  });
  return { data, isLoading, error };
};

export default useQueryBucketFolderList;
