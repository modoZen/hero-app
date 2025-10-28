import { baseUrl } from "@/global";
import { heroApi } from "../api/hero.api";
import type { HeroResponse } from "../domain/Hero";

export const getHeroesByPageAction = async (
  page: number,
  limit: number = 6,
  category: string = "all"
): Promise<HeroResponse> => {
  if (isNaN(page) || page < 1) page = 1;

  const { data } = await heroApi.get<HeroResponse>("/", {
    params: {
      limit,
      offset: (page - 1) * limit,
      category,
    },
  });

  const heroes = data.heroes.map((hero) => ({
    ...hero,
    image: `${baseUrl}/images/${hero.image}`,
  }));

  return {
    ...data,
    heroes,
  };
};
