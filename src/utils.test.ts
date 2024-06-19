import { describe, expect, it } from "vitest";
import { buildURLPath } from "./utils";

describe("utils: buildURLPath fn", () => {
  it("should throw error if incorrect type passed", () => {
    expect(() => buildURLPath("foo")).toThrowError();
    expect(() => buildURLPath("genre")).not.toThrowError();
    expect(() => buildURLPath("search")).not.toThrowError();
  });

  it("should return the correct url for given inputs", () => {
    const result = buildURLPath("search", "", "?q=fiction");
    expect(result).toBe("/search.json?q=fiction&limit=50");

    const result2 = buildURLPath("author", "Dave Barry", "");
    expect(result2).toBe("/authors/Dave Barry.json");
  });
});
