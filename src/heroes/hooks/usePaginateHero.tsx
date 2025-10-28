import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/getHeroesByPage";

export const usePaginateHero = (
  page: number,
  limit: number,
  category: string
) => {
  return useQuery({
    queryKey: ["heroes", { page, limit, category }],
    queryFn: () => getHeroesByPageAction(page, limit, category),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
