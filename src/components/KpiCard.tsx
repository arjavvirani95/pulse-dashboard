import type { Kpi } from "@/lib/metrics";
import { percentChange } from "@/lib/metrics";
import { formatDelta, formatValue } from "@/lib/format";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const delta = percentChange(kpi.value, kpi.previous);
  const up = (delta ?? 0) >= 0;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm text-slate-500 dark:text-slate-400">{kpi.label}</p>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{formatValue(kpi.value, kpi.format)}</p>
      <p className={`mt-1 text-xs font-medium ${up ? "text-emerald-600" : "text-rose-600"}`}>
        {formatDelta(delta)} <span className="font-normal text-slate-400">vs previous period</span>
      </p>
    </div>
  );
}
