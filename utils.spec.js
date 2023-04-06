import { describe, expect, test } from "vitest";
import { randomColor, transformDate, transformPrice } from "./utils.js";

describe("generate a random color", () => {
  test("returns a string", () => {
    const hexRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    expect(randomColor(0)).toMatch(hexRegex);
  });
});

describe("transform Dates", () => {
  test('returns a string in the form of "Month day, year"', () => {
    const input = new Date(2023, 3, 6).getTime(); // April 6th, 2023
    expect(transformDate(input)).toBe("April 6, 2023");
  });
});

describe("transform US currency", () => {
  test("returns a string in the form of US currency", () => {
    expect(transformPrice(123.45)).toBe("$123.45");
  });
});
