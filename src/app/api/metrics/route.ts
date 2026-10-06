import { NextResponse, type NextRequest } from "next/server";
import { RANGES, computeKpis, generateDaily, parseRange, trafficBySource } from "@/lib/metrics";

export function GET(req: NextRequest) {
  const range = parseRange(req.nextUrl.searchParams.get("range") ?? undefined);
  const days = RANGES[range];
  const rows = generateDaily(days * 2);
  const kpis = computeKpis(rows, days);
  return NextResponse.json(
    { range, kpis, daily: rows.slice(-days), sources: trafficBySource(kpis[1].value) },
    { headers: { "Cache-Control": "public, max-age=60" } },
  );
}
