import { useQuery } from "@tanstack/react-query";
import { fetchApps } from "@/api/mockApi";

export function useApps() {
  return useQuery({
    queryKey: ["apps"],
    queryFn: fetchApps,
  });
}
