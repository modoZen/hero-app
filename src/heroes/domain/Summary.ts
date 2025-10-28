import type { Hero } from "./Hero";

export interface SummaryResponse {
  totalHeroes: number;
  strongestHero: Hero;
  smartestHero: Hero;
  heroCount: number;
  villainCount: number;
}
