import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import type { Hero } from "../domain/Hero";
import { FavoriteHeroContext } from "./FavoriteHeroContext";

const getFavoriteHeroesFromStorage = (): Hero[] => {
  const favs = localStorage.getItem("favorites");
  return favs ? JSON.parse(favs) : [];
};

export const FavoriteHeroProvider: FC<PropsWithChildren> = ({ children }) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoriteHeroesFromStorage()
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const favoriteCount = favorites.length;

  const isFavorite = (hero: Hero) => {
    return favorites.some((h) => h.id === hero.id);
  };

  const toggleFavorite = (hero: Hero): void => {
    const isFav = favorites.some((h) => h.id === hero.id);
    if (isFav) {
      const newFavorites = favorites.filter((h) => h.id !== hero.id);
      setFavorites(newFavorites);
      return;
    }
    const newFavorites = [...favorites, hero];
    setFavorites(newFavorites);
  };

  return (
    <FavoriteHeroContext
      value={{
        favorites,
        favoriteCount,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
