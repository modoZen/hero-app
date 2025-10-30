import { createContext } from "react";
import type { Hero } from "../domain/Hero";

interface FavoriteHeroContext {
  favorites: Hero[];
  favoriteCount: number;

  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

export const FavoriteHeroContext = createContext<FavoriteHeroContext>(
  {} as FavoriteHeroContext
);
