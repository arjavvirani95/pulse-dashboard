const nav = [
  { label: "Overview", href: "/" },
  { label: "Revenue", href: "/#revenue" },
  { label: "Traffic", href: "/#traffic" },
  { label: "Pages", href: "/#pages" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-white px-4 py-6 md:block dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-8 flex items-center gap-2 px-2 text-lg font-semibold">
        <span className="inline-block h-3 w-3 rounded-full bg-brand-500" /> Pulse
      </div>
      <nav className="space-y-1 text-sm">
        {nav.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="block rounded-md px-2 py-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
