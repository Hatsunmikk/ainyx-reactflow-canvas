import { useQuery } from "@tanstack/react-query";
import { fetchAppGraph } from "@/api/mockApi";

export function useGraph(appId: string | null) {
  return useQuery({
    queryKey: ["graph", appId],
    queryFn: () => fetchAppGraph(appId!),
    enabled: Boolean(appId),
  });
}
