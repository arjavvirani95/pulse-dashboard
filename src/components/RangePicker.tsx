import Link from "next/link";
import { RANGES, type RangeKey } from "@/lib/metrics";

export function RangePicker({ active }: { active: RangeKey }) {
  return (
    <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 text-sm dark:border-slate-800 dark:bg-slate-900">
      {(Object.keys(RANGES) as RangeKey[]).map((key) => (
        <Link
          key={key}
          href={`/?range=${key}`}
          scroll={false}
          aria-current={key === active ? "page" : undefined}
          className={`rounded-md px-3 py-1 ${
            key === active
              ? "bg-brand-600 text-white"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
        >
          {key}
        </Link>
      ))}
    </div>
  );
}
