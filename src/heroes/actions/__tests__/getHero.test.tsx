import { describe, expect, it } from "vitest";
import { getHeroAction } from "../getHero";

describe("getHeroAction", () => {
  it("should fetch hero data and return with complete image URL", async () => {
    const result = await getHeroAction("1");

    expect(result).toEqual({
      id: "1",
      name: "Clark Kent",
      slug: "clark-kent",
      alias: "Superman",
      powers: [
        "Súper fuerza",
        "Vuelo",
        "Visión de calor",
        "Visión de rayos X",
        "Invulnerabilidad",
        "Súper velocidad",
      ],
      description:
        "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
      strength: 10,
      intelligence: 8,
      speed: 9,
      durability: 10,
      team: "Liga de la Justicia",
      image: "http://localhost:3000/images/1.jpeg",
      firstAppearance: "1938",
      status: "Active",
      category: "Hero",
      universe: "DC",
    });
  });

  it("should throw an error if hero is not found", async () => {
    try {
      await getHeroAction("non-existent-hero");
    } catch (error) {
      expect(error).toBeDefined();
      expect((error as Error).message).toBe(
        "Request failed with status code 404"
      );
    }
  });
});
