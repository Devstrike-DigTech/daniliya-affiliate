import Icon from "@/components/Icon";

export function PageHead({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold sm:text-[28px]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink/55">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const paid = status.toLowerCase() === "paid";
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
        paid ? "bg-green-100 text-green-700" : "bg-brand/15 text-brand"
      }`}
    >
      {status}
    </span>
  );
}

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl border border-ink/10 bg-white p-6 ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  up,
  sub,
  icon,
}: {
  label: string;
  value: string;
  delta?: string;
  up?: boolean;
  sub?: string;
  icon: string;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <p className="text-sm text-ink/55">{label}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
          <Icon name={icon} size={18} />
        </span>
      </div>
      <p className="mt-3 text-[26px] font-bold leading-none">{value}</p>
      {delta && (
        <p className={`mt-2 text-xs font-bold ${up ? "text-green-600" : "text-red-500"}`}>
          {delta}
        </p>
      )}
      {sub && <p className="mt-2 text-xs text-ink/50">{sub}</p>}
    </Card>
  );
}
