"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { SourceShare } from "@/lib/metrics";

const COLORS = ["#6366f1", "#06b6d4", "#f59e0b", "#ec4899", "#10b981"];

export function SourcesChart({ data }: { data: SourceShare[] }) {
  const total = data.reduce((a, s) => a + s.visitors, 0);
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="h-48 w-48 shrink-0">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="visitors" nameKey="source" innerRadius={50} outerRadius={80} paddingAngle={2}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={(v) => Number(v).toLocaleString()} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="w-full space-y-2 text-sm">
        {data.map((s, i) => (
          <li key={s.source} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
              {s.source}
            </span>
            <span className="tabular-nums text-slate-500">{((s.visitors / total) * 100).toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
