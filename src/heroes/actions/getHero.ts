import { baseUrl } from "@/global";
import { heroApi } from "../api/hero.api";
import type { Hero } from "../domain/Hero";

export const getHeroAction = async (slug: string) => {
  const { data } = await heroApi.get<Hero>(`/${slug}`);

  return {
    ...data,
    image: `${baseUrl}/images/${data.image}`,
  };
};
