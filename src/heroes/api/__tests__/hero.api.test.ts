import { describe, expect, it } from "vitest";
import { heroApi } from "../hero.api";

describe("Hero API", () => {
  it("should be configure pointing to the testing server", () => {
    expect(heroApi).toBeDefined();
    expect(heroApi.defaults.baseURL).toBe(
      "http://wsl.localhost:5000/api/heroes"
    );
  });
});
