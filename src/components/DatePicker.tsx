"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const fmt = (d: Date) =>
  `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;

const parse = (v?: string): Date | null => {
  if (!v) return null;
  const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const d = new Date(+m[3], +m[2] - 1, +m[1]);
  return isNaN(d.getTime()) ? null : d;
};

/** Brand-themed calendar date picker (DOB-friendly: jump by year). */
export default function DatePicker({
  value,
  onChange,
  placeholder = "dd/mm/yyyy",
}: {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
}) {
  const selected = useMemo(() => parse(value), [value]);
  const today = useMemo(() => new Date(), []);
  const start = selected ?? new Date(today.getFullYear() - 20, today.getMonth(), 1);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"days" | "years">("days");
  const [vy, setVy] = useState(start.getFullYear());
  const [vm, setVm] = useState(start.getMonth());
  const [yearBase, setYearBase] = useState(start.getFullYear() - 6);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const daysInMonth = new Date(vy, vm + 1, 0).getDate();
  const firstDow = new Date(vy, vm, 1).getDay();
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isSel = (d: number) =>
    selected &&
    selected.getFullYear() === vy &&
    selected.getMonth() === vm &&
    selected.getDate() === d;
  const isToday = (d: number) =>
    today.getFullYear() === vy &&
    today.getMonth() === vm &&
    today.getDate() === d;

  const stepMonth = (dir: number) => {
    let m = vm + dir;
    let y = vy;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setVm(m);
    setVy(y);
  };

  const pick = (d: number) => {
    onChange?.(fmt(new Date(vy, vm, d)));
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-left text-sm outline-none transition-colors ${
          open ? "border-brand" : "border-ink/15 hover:border-ink/30"
        }`}
      >
        <span className={selected ? "text-ink" : "text-ink/35"}>
          {value || placeholder}
        </span>
        <Icon name="calendar" size={18} className="text-ink/45" />
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-[300px] rounded-2xl border border-ink/10 bg-white p-4 shadow-xl">
          {/* header */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => (mode === "days" ? stepMonth(-1) : setYearBase((y) => y - 12))}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/60 transition-colors hover:bg-brand/10 hover:text-brand"
            >
              <Icon name="chevron-left" size={18} />
            </button>
            <button
              type="button"
              onClick={() => setMode((m) => (m === "days" ? "years" : "days"))}
              className="rounded-lg px-3 py-1 text-sm font-bold transition-colors hover:bg-brand/10"
            >
              {mode === "days" ? `${MONTHS[vm]} ${vy}` : `${yearBase} – ${yearBase + 11}`}
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => (mode === "days" ? stepMonth(1) : setYearBase((y) => y + 12))}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/60 transition-colors hover:bg-brand/10 hover:text-brand"
            >
              <Icon name="chevron-right" size={18} />
            </button>
          </div>

          {mode === "days" ? (
            <>
              <div className="mt-3 grid grid-cols-7 text-center text-[11px] font-bold text-ink/40">
                {WEEKDAYS.map((w) => (
                  <span key={w} className="py-1">{w}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-1">
                {cells.map((d, i) =>
                  d === null ? (
                    <span key={i} />
                  ) : (
                    <button
                      key={i}
                      type="button"
                      onClick={() => pick(d)}
                      className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors ${
                        isSel(d)
                          ? "bg-brand font-bold text-white"
                          : isToday(d)
                            ? "font-bold text-brand ring-1 ring-brand/40 hover:bg-brand/10"
                            : "text-ink/70 hover:bg-brand/10"
                      }`}
                    >
                      {d}
                    </button>
                  ),
                )}
              </div>
            </>
          ) : (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {Array.from({ length: 12 }, (_, i) => yearBase + i).map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => { setVy(y); setMode("days"); }}
                  className={`rounded-lg py-2 text-sm transition-colors ${
                    y === vy ? "bg-brand font-bold text-white" : "text-ink/70 hover:bg-brand/10"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
