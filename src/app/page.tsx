import { Card } from "@/components/Card";
import { KpiCard } from "@/components/KpiCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RangePicker } from "@/components/RangePicker";
import { PagesTable } from "@/components/PagesTable";
import { RevenueChart } from "@/components/RevenueChart";
import { SourcesChart } from "@/components/SourcesChart";
import { RANGES, computeKpis, generateDaily, parseRange, topPages, trafficBySource } from "@/lib/metrics";

export default async function Home({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  const range = parseRange((await searchParams).range);
  const days = RANGES[range];
  const rows = generateDaily(days * 2);
  const kpis = computeKpis(rows, days);
  const visitors = kpis[1].value;

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <div className="flex items-center gap-2">
          <RangePicker active={range} />
          <ThemeToggle />
        </div>
      </header>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => <KpiCard key={k.label} kpi={k} />)}
      </section>
      <Card id="revenue" title="Revenue">
        <RevenueChart data={rows.slice(-days)} />
      </Card>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card id="traffic" title="Traffic sources">
          <SourcesChart data={trafficBySource(visitors)} />
        </Card>
        <Card id="pages" title="Top pages">
          <PagesTable pages={topPages(visitors)} />
        </Card>
      </div>
    </main>
  );
}
