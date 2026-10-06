import { describe, expect, it } from "vitest";
import { computeKpis, generateDaily, parseRange, percentChange } from "./metrics";

const end = new Date("2026-10-01T12:00:00Z");

describe("generateDaily", () => {
  it("returns consecutive days ending at the given date", () => {
    const rows = generateDaily(10, end);
    expect(rows).toHaveLength(10);
    expect(rows.at(-1)!.date).toBe("2026-10-01");
    expect(rows[0].date).toBe("2026-09-22");
  });

  it("is deterministic for the same seed", () => {
    expect(generateDaily(30, end, 7)).toEqual(generateDaily(30, end, 7));
    expect(generateDaily(30, end, 7)).not.toEqual(generateDaily(30, end, 8));
  });

  it("keeps signups below visitors", () => {
    for (const r of generateDaily(90, end)) expect(r.signups).toBeLessThan(r.visitors);
  });
});

describe("computeKpis", () => {
  it("compares the current period to the previous one", () => {
    const rows = generateDaily(60, end);
    const [revenue, visitors] = computeKpis(rows, 30);
    const expected = rows.slice(-30).reduce((a, r) => a + r.visitors, 0);
    expect(visitors.value).toBe(expected);
    expect(revenue.previous).toBeGreaterThan(0);
  });
});

describe("helpers", () => {
  it("percentChange handles zero", () => {
    expect(percentChange(5, 0)).toBeNull();
    expect(percentChange(150, 100)).toBeCloseTo(0.5);
  });

  it("parseRange falls back to 30d", () => {
    expect(parseRange("7d")).toBe("7d");
    expect(parseRange("1y")).toBe("30d");
    expect(parseRange(undefined)).toBe("30d");
  });
});
