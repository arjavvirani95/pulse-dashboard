import { KpiCard } from "@/components/KpiCard";
import { computeKpis, generateDaily } from "@/lib/metrics";

export default function Home() {
  const days = 30;
  const rows = generateDaily(days * 2);
  const kpis = computeKpis(rows, days);

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Overview</h1>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => <KpiCard key={k.label} kpi={k} />)}
      </section>
    </main>
  );
}
