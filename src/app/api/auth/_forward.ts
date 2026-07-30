import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

/**
 * Forwards a JSON body to a public API auth endpoint and normalises the
 * response, so every auth route handler surfaces the API's real error text
 * (including class-validator arrays) instead of a generic failure.
 */
export async function forwardAuth(
  path: string,
  body: unknown,
  fallbackMessage: string,
): Promise<{ ok: true; data: Record<string, unknown> } | { ok: false; res: NextResponse }> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    const raw = payload?.message;
    return {
      ok: false,
      res: NextResponse.json(
        { message: Array.isArray(raw) ? raw.join(", ") : (raw ?? fallbackMessage) },
        { status: res.status },
      ),
    };
  }
  return { ok: true, data: (payload?.data ?? {}) as Record<string, unknown> };
}
