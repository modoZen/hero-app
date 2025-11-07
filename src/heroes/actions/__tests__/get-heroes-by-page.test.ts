import { beforeEach, describe, expect, it } from "vitest";
import AxioxsMockAdapter from "axios-mock-adapter";
import { heroApi } from "@/heroes/api/hero.api";
import { getHeroesByPageAction } from "../getHeroesByPage";

const baseUrl = import.meta.env.VITE_API_URL;

describe("getHeroesByPage", () => {
  const heroesApiMock = new AxioxsMockAdapter(heroApi);

  beforeEach(() => {
    heroesApiMock.reset();
  });

  it("should return default heroes", async () => {
    heroesApiMock.onGet("/").reply(200, {
      pages: 2,
      total: 10,
      heroes: [
        {
          image: "1.jpeg",
        },
        {
          image: "2.jpeg",
        },
      ],
    });
    const response = await getHeroesByPageAction(1);

    expect(response).toEqual({
      pages: 2,
      total: 10,
      heroes: [
        {
          image: `${baseUrl}/images/1.jpeg`,
        },
        {
          image: `${baseUrl}/images/2.jpeg`,
        },
      ],
    });
  });

  it("should return the correct heroes when page is not a number", async () => {
    const responseObject = {
      pages: 2,
      total: 10,
      heroes: [],
    };
    heroesApiMock.onGet("/").reply(200, responseObject);

    await getHeroesByPageAction("abc" as unknown as number);

    const params = heroesApiMock.history.get[0].params;

    expect(params).toStrictEqual({ category: "all", limit: 6, offset: 0 });
  });

  it("should return the correct heroes when page is string number", async () => {
    const responseObject = {
      pages: 2,
      total: 10,
      heroes: [],
    };
    heroesApiMock.onGet("/").reply(200, responseObject);

    await getHeroesByPageAction("5" as unknown as number);

    const params = heroesApiMock.history.get[0].params;

    expect(params).toStrictEqual({ category: "all", limit: 6, offset: 24 });
  });

  it("should call api with the correct params", async () => {
    const responseObject = {
      pages: 2,
      total: 10,
      heroes: [],
    };
    heroesApiMock.onGet("/").reply(200, responseObject);

    await getHeroesByPageAction(2, 10, "heroes");

    const params = heroesApiMock.history.get[0].params;

    expect(params).toStrictEqual({ category: "heroes", limit: 10, offset: 10 });
  });
});
