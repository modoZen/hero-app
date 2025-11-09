import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HomePage } from "../HomePage";
import { MemoryRouter } from "react-router";
import { usePaginateHero } from "@/heroes/hooks/usePaginateHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroProvider";

vi.mock("@/heroes/hooks/usePaginateHero");

const mockUsePaginateHero = vi.mocked(usePaginateHero);

mockUsePaginateHero.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
} as unknown as ReturnType<typeof mockUsePaginateHero>);

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>
        <FavoriteHeroProvider>
          <HomePage />
        </FavoriteHeroProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should render the HomePage with defaul values", () => {
    const { container } = renderHomePage();
    expect(container).toMatchSnapshot();
  });

  it("should call usePaginateHero with default values", () => {
    renderHomePage();
    expect(mockUsePaginateHero).toHaveBeenCalledWith(1, 6, "all");
  });

  it("should call usePaginateHero with custom query values", () => {
    renderHomePage(["/?page=2&limit=10&category=villains"]);
    expect(mockUsePaginateHero).toHaveBeenCalledWith(2, 10, "villains");
  });

  it("should call usePaginateHero with default page and same limit on tab clicked", () => {
    renderHomePage(["/?tab=favorites&page=2&limit=10"]);

    const [, , , villainsTab] = screen.getAllByRole("tab");

    fireEvent.click(villainsTab);

    expect(mockUsePaginateHero).toHaveBeenCalledWith(1, 10, "villain");
  });
});
