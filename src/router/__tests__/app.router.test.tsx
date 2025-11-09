import { describe, expect, it, vi } from "vitest";
import { router as appRouter } from "../app.router";
import { render, screen } from "@testing-library/react";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router";

vi.mock("@/heroes/layout/HeroesLayout", () => ({
  HeroesLayout: () => (
    <div>
      <Outlet />
    </div>
  ),
}));

vi.mock("@/heroes/pages/home/HomePage", () => ({
  HomePage: () => <div>Home Page</div>,
}));

vi.mock("@/heroes/pages/hero/HeroPage", () => ({
  HeroPage: () => {
    const { idSlug } = useParams();

    return <div>Hero Page - {idSlug}</div>;
  },
}));

vi.mock("@/heroes/pages/search/SearchPage", () => ({
  default: () => <div>Search Page</div>,
}));

describe("AppRouter", () => {
  it("should be configured as expected", () => {
    expect(appRouter.routes).toMatchSnapshot();
  });

  it("should render home page at root path", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByText("Home Page")).toBeDefined();
  });

  it("should render hero page at heroes/:idSlug path", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/heroes/superman"],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByText("Hero Page - superman")).toBeDefined();
  });

  it("should redirect to hero page for unkown routes", async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/search"],
    });
    render(<RouterProvider router={router} />);

    expect(screen.findByText("Home Page")).toBeDefined();
  });
});
