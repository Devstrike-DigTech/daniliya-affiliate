import type { Accent } from "@/lib/data";

/** Renders a heading with its gold-accented segment: {pre}<gold>{post} */
type AccentVariant = "text" | "badge";

interface AccentTextProps {
  a: Accent;
  variant?: AccentVariant;
}

export default function AccentText({
  a,
  variant = "text",
}: AccentTextProps) {
  return (
    <>
      {a.pre}

      {a.gold && (
        <span
          className={
            variant === "badge"
              ? "rounded-full bg-brand px-3 py-1 text-white"
              : "text-brand"
          }
        >
          {a.gold}
        </span>
      )}

      {a.post}
    </>
  );
}