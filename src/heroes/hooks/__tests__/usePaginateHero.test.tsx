import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePaginateHero } from "../usePaginateHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getHeroesByPageAction } from "@/heroes/actions/getHeroesByPage";

vi.mock("@/heroes/actions/getHeroesByPage", () => ({
  getHeroesByPageAction: vi.fn(),
}));

const mockedGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const tanStackCustomProvider = () => {
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePaginateHero", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    queryClient.clear();
  });

  it("should return initial state", () => {
    const { result } = renderHook(() => usePaginateHero(1, 8, "heroes"), {
      wrapper: tanStackCustomProvider(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.isError).toBeFalsy();
  });

  it("should return the success state with data when API call succeeds", async () => {
    const mockHeroesData = {
      pages: 4,
      total: 20,
      heroes: [],
    };

    mockedGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

    const { result } = renderHook(() => usePaginateHero(1, 8, "heroes"), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
      expect(result.current.data).toEqual(mockHeroesData);
    });
  });

  it("should call mockedGetHeroesByPageActionwith arguments", async () => {
    const mockHeroesData = {
      pages: 4,
      total: 20,
      heroes: [],
    };

    mockedGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

    const { result } = renderHook(() => usePaginateHero(1, 8, "heroes"), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
      expect(mockedGetHeroesByPageAction).toHaveBeenCalled();
      expect(mockedGetHeroesByPageAction).toHaveBeenCalledWith(1, 8, "heroes");
    });
  });
});
