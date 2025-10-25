import { baseUrl } from "@/global";
import { heroApi } from "../api/hero.api";
import type { HeroResponse } from "../domain/Hero";

export const getHeroesByPageAction = async (): Promise<HeroResponse> => {
  const { data } = await heroApi.get<HeroResponse>("/");

  const heroes = data.heroes.map((hero) => ({
    ...hero,
    image: `${baseUrl}/images/${hero.image}`,
  }));

  return {
    ...data,
    heroes,
  };
};
