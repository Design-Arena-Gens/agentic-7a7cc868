interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/40 p-8 shadow-2xl shadow-slate-950/50">
      {badge ? <span className="badge mb-4">{badge}</span> : null}
      <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-base text-slate-300">{subtitle}</p>
      <div className="pointer-events-none absolute -top-28 right-0 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl" />
    </div>
  );
}
