import { baseUrl } from "@/global";
import { heroApi } from "../api/hero.api";
import type { Hero } from "../domain/Hero";

interface Options {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}

export const searchHero = async (options: Options) => {
  const { category, name, status, strength, team, universe } = options;

  if (!category && !name && !status && !strength && !team && !universe) {
    return [];
  }

  const { data: heroes } = await heroApi.get<Hero[]>("/search", {
    params: { name, team, category, universe, status, strength },
  });

  const result = heroes.map((hero) => ({
    ...hero,
    image: `${baseUrl}/images/${hero.image}`,
  }));

  return result;
};
