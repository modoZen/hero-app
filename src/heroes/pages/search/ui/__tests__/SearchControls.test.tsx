import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { SearchControls } from "../SearchControls";

if (typeof window.ResizeObserver === "undefined") {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserver;
}

const renderWithRouter = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchControls />
    </MemoryRouter>
  );
};

describe("SearchControls", () => {
  it("should render with default values", () => {
    const { container } = renderWithRouter();

    expect(container).toMatchSnapshot();
  });

  it("should set input value when search param name is set", () => {
    renderWithRouter(["?name=Batman"]);
    const input = screen.getByPlaceholderText(
      "Search heroes, villains, powers, teams..."
    );

    expect(input.getAttribute("value")).toBe("Batman");
  });

  it("should change params when input is changed and enter is pressed", () => {
    renderWithRouter(["?name=Batman"]);
    const input = screen.getByPlaceholderText(
      "Search heroes, villains, powers, teams..."
    );
    expect(input.getAttribute("value")).toBe("Batman");

    fireEvent.change(input, { target: { value: "Superman" } });

    fireEvent.keyDown(input, { key: "Enter" });

    expect(input.getAttribute("value")).toBe("Superman");
  });

  it("should change params strength when slider changed", () => {
    renderWithRouter(["/?name=Batman&active-accordion=advanced-filters"]);

    const slider = screen.getByRole("slider");
    expect(slider.getAttribute("aria-valuenow")).toBe("0");

    fireEvent.keyDown(slider, { key: "ArrowRight" });

    expect(slider.getAttribute("aria-valuenow")).toBe("1");
  });

  it("should accordion be open when active-accordion param is not set", () => {
    renderWithRouter(["/?name=Batman"]);

    const accordion = screen.getByTestId("accordion");
    const accordionContent = accordion.querySelector("div");

    expect(accordionContent?.getAttribute("data-state")).toBe("closed");
  });
});
