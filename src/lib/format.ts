const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
const percent = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1 });

export function formatValue(value: number, format: "number" | "currency" | "percent"): string {
  if (format === "currency") return currency.format(value);
  if (format === "percent") return percent.format(value);
  return value >= 10_000 ? compact.format(value) : value.toLocaleString("en-US");
}

export function formatDelta(delta: number | null): string {
  if (delta === null) return "—";
  const sign = delta > 0 ? "+" : "";
  return `${sign}${percent.format(delta)}`;
}
