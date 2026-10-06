import { expect, it } from "vitest";
import { formatDelta, formatValue } from "./format";

it("formats values", () => {
  expect(formatValue(1234.5, "currency")).toBe("$1,235");
  expect(formatValue(0.0425, "percent")).toBe("4.3%");
  expect(formatValue(980, "number")).toBe("980");
  expect(formatValue(45_200, "number")).toBe("45.2K");
});

it("formats deltas with a sign", () => {
  expect(formatDelta(0.12)).toBe("+12%");
  expect(formatDelta(-0.034)).toBe("-3.4%");
  expect(formatDelta(null)).toBe("—");
});
