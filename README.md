# pulse-dashboard

[![CI](https://github.com/arjavvirani95/pulse-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/arjavvirani95/pulse-dashboard/actions/workflows/ci.yml)

A product analytics dashboard built with **Next.js (App Router)**, **React Server Components**, **Tailwind CSS v4** and **Recharts**.

## Features

- KPI cards (revenue, visitors, signups, conversion) with period-over-period change
- Revenue trend area chart, traffic-source donut and top-pages table
- 7 / 30 / 90 day ranges driven by URL search params, so views are shareable
- Dark mode that follows the system setting, with a toggle that is remembered and applied before first paint
- `GET /api/metrics?range=30d` JSON endpoint
- Deterministic, seeded demo data so charts are stable and testable
- Unit tests for the data and formatting logic with Vitest

## Architecture

Pages are server components: data is computed on the server and only the chart components (`"use client"`) ship JavaScript to the browser. The data layer in `src/lib/metrics.ts` is pure and has no framework dependencies, so it can be swapped for a real warehouse query without touching the UI.

```
src/
  app/
    page.tsx              dashboard (server component)
    api/metrics/route.ts  JSON API
  components/             KPI cards, charts, table, range picker, theme toggle
  lib/
    metrics.ts            data generation + aggregation
    format.ts             number / currency / percent formatting
```

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm test
npm run build
```

## License

MIT
