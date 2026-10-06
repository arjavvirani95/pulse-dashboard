import type { PageStat } from "@/lib/metrics";

const duration = (s: number) => `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;

export function PagesTable({ pages }: { pages: PageStat[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase text-slate-400">
          <tr>
            <th className="pb-2 font-medium">Page</th>
            <th className="pb-2 text-right font-medium">Views</th>
            <th className="pb-2 text-right font-medium">Avg. time</th>
            <th className="pb-2 text-right font-medium">Bounce</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {pages.map((p) => (
            <tr key={p.path}>
              <td className="py-2 font-mono text-xs">{p.path}</td>
              <td className="py-2 text-right tabular-nums">{p.views.toLocaleString()}</td>
              <td className="py-2 text-right tabular-nums">{duration(p.avgSeconds)}</td>
              <td className="py-2 text-right tabular-nums">{(p.bounceRate * 100).toFixed(0)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
