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
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    // The API was unreachable — almost always a missing/wrong API_URL on the
    // deployment (it defaults to http://localhost:4000, which fails from a
    // hosted server). Surface that instead of a bare 500 with no body, so the
    // request never silently vanishes before it reaches the backend.
    console.error(`[auth] cannot reach API at ${API_URL}${path}:`, err);
    return {
      ok: false,
      res: NextResponse.json(
        { message: "Cannot reach the Daniliya API. Please try again shortly." },
        { status: 502 },
      ),
    };
  }
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
