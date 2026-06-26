"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "@/components/Icon";
import CopyButton from "@/components/CopyButton";
import { affiliate, dashboardNav, masterLink } from "@/lib/dashboard";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {dashboardNav.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
              active ? "bg-brand text-white" : "text-ink/70 hover:bg-ink/5"
            }`}
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col p-4">
      <Link href="/" onClick={onNavigate} className="flex items-center gap-2 px-2">
        <span className="text-2xl font-bold text-brand">Daniliya</span>
        <span className="rounded bg-ink/5 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink/50">
          Affiliate
        </span>
      </Link>

      <div className="mt-5 flex items-center justify-between rounded-2xl bg-coal p-4 text-white">
        <div>
          <p className="text-sm font-bold">{affiliate.firstName}</p>
          <p className="text-xs text-white/55">{affiliate.code}</p>
        </div>
        <CopyButton value={masterLink} className="rounded-lg bg-white/10 p-2 text-white" />
      </div>

      <div className="mt-5 flex-1">
        <NavLinks onNavigate={onNavigate} />
      </div>

      <Link
        href="/profile"
        onClick={onNavigate}
        className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-ink/5"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
          {affiliate.initials}
        </span>
        <span className="flex-1">
          <span className="block text-sm font-bold">{affiliate.firstName}</span>
          <span className="block text-xs text-ink/50">{affiliate.code}</span>
        </span>
        <Icon name="chevron-right" size={16} className="text-ink/40" />
      </Link>
      <a
        href="/login"
        className="mt-2 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
      >
        <Icon name="logout" size={18} /> Sign out
      </a>
    </div>
  );
}

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Onboarding (/join) and the auth pages bring their own chrome — render them
  // without the dashboard sidebar.
  const bare = ["/join", "/login", "/forgot-password", "/reset-password"];
  if (pathname && bare.some((r) => pathname.startsWith(r))) return <>{children}</>;

  return (
    <div className="min-h-screen bg-paper lg:flex">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 border-r border-ink/10 bg-white lg:block">
        <SidebarBody />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-[280px] bg-white shadow-xl">
            <SidebarBody onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="min-w-0 flex-1">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink/10 bg-white/90 px-4 backdrop-blur sm:px-8">
          <button
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
          >
            <Icon name="menu" size={22} />
          </button>
          <div className="ml-auto flex items-center gap-4">
            <button
              aria-label="Notifications"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-colors hover:bg-ink/5"
            >
              <Icon name="bell" size={18} />
            </button>
            <Link href="/profile" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                {affiliate.initials}
              </span>
              <span className="hidden sm:block">
                <span className="block text-sm font-bold leading-tight">{affiliate.firstName}</span>
                <span className="block text-xs text-ink/50">{affiliate.code}</span>
              </span>
            </Link>
          </div>
        </header>

        <main className="px-4 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
