import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/getHeroesByPage";

export const usePaginateHero = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["heroes", { page }],
    queryFn: () => getHeroesByPageAction(page, limit),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
