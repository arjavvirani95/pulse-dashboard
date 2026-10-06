import { createRng } from "./random";

export interface DailyMetric {
  date: string; // YYYY-MM-DD
  visitors: number;
  signups: number;
  revenue: number; // USD
}

export interface Kpi {
  label: string;
  value: number;
  previous: number;
  format: "number" | "currency" | "percent";
}

export const RANGES = { "7d": 7, "30d": 30, "90d": 90 } as const;
export type RangeKey = keyof typeof RANGES;

export function parseRange(value: string | undefined): RangeKey {
  return value && value in RANGES ? (value as RangeKey) : "30d";
}

const DAY = 86_400_000;

/** Generates `days` of synthetic daily metrics ending at `end`, with growth, weekly seasonality and noise. */
export function generateDaily(days: number, end = new Date(), seed = 42): DailyMetric[] {
  const rng = createRng(seed);
  const endUtc = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());
  const out: DailyMetric[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const t = endUtc - i * DAY;
    const day = new Date(t).getUTCDay();
    const growth = 1 + (days - i) / days / 2;
    const weekly = day === 0 || day === 6 ? 0.7 : 1;
    const noise = 0.85 + rng() * 0.3;
    const visitors = Math.round(1200 * growth * weekly * noise);
    const signups = Math.round(visitors * (0.03 + rng() * 0.015));
    const revenue = Math.round(signups * (38 + rng() * 12) * 100) / 100;
    out.push({ date: new Date(t).toISOString().slice(0, 10), visitors, signups, revenue });
  }
  return out;
}

const sum = (rows: DailyMetric[], key: keyof Omit<DailyMetric, "date">) =>
  rows.reduce((acc, r) => acc + r[key], 0);

/** Splits the last 2*n days into current and previous periods and builds KPI cards. */
export function computeKpis(rows: DailyMetric[], n: number): Kpi[] {
  const current = rows.slice(-n);
  const previous = rows.slice(-2 * n, -n);
  const conv = (r: DailyMetric[]) => (sum(r, "visitors") ? sum(r, "signups") / sum(r, "visitors") : 0);
  return [
    { label: "Revenue", value: sum(current, "revenue"), previous: sum(previous, "revenue"), format: "currency" },
    { label: "Visitors", value: sum(current, "visitors"), previous: sum(previous, "visitors"), format: "number" },
    { label: "Signups", value: sum(current, "signups"), previous: sum(previous, "signups"), format: "number" },
    { label: "Conversion", value: conv(current), previous: conv(previous), format: "percent" },
  ];
}

export function percentChange(value: number, previous: number): number | null {
  if (previous === 0) return null;
  return (value - previous) / previous;
}
