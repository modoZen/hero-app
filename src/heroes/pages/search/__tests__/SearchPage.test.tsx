import { beforeEach, describe, expect, it, vi } from "vitest";
import SearchPage from "../SearchPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import { searchHero } from "@/heroes/actions/searchHero";
import type { Hero } from "@/heroes/domain/Hero";

vi.mock("@/heroes/actions/searchHero");

const mockSearchHero = vi.mocked(searchHero);

vi.mock("@/heroes/components/HeroGrid", () => ({
  HeroGrid: ({ heroes = [] }: { heroes: Hero[] }) => (
    <div data-testid="hero-grid">
      {heroes.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </div>
  ),
}));

const queryClient = new QueryClient();

const renderSearchPage = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>
        <SearchPage />
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe("SearchPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should render SearchPage with default values", () => {
    renderSearchPage();

    expect(mockSearchHero).toHaveBeenCalledWith({
      name: undefined,
      strength: undefined,
    });
  });

  it("should call search hero action with name parameter", () => {
    renderSearchPage(["/search?name=superman"]);

    expect(mockSearchHero).toHaveBeenCalledWith({
      name: "superman",
      strength: undefined,
    });
  });

  it("should call search hero action with strength parameter", () => {
    renderSearchPage(["/search?strength=6"]);

    expect(mockSearchHero).toHaveBeenCalledWith({
      name: undefined,
      strength: "6",
    });
  });

  it("should call search hero action with strength and name parameter", () => {
    renderSearchPage(["/search?name=superman&strength=6"]);

    expect(mockSearchHero).toHaveBeenCalledWith({
      name: "superman",
      strength: "6",
    });
  });

  it("should render HeroGrid with seach results", async () => {
    const mockHeroes = [
      { id: "1", name: "Clack Kent" } as unknown as Hero,
      { id: "2", name: "Bruce Wayne" } as unknown as Hero,
    ];

    mockSearchHero.mockResolvedValue(mockHeroes);

    renderSearchPage();

    expect(await screen.findByText(mockHeroes[0].name)).toBeDefined();
    expect(await screen.findByTestId("hero-grid")).toBeDefined();
  });
});
