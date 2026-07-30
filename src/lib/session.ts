import { cookies } from "next/headers";
import { API_URL } from "./api";
import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE,
  REFRESH_COOKIE,
  REFRESH_MAX_AGE,
  cookieOptions,
} from "./auth-cookies";

/**
 * Rotates the token pair and rewrites both cookies.
 *
 * This is not just a convenience: `POST /onboarding/role` changes the user's
 * role in the database but the access token in the cookie still carries the
 * OLD role (CUSTOMER), so every /affiliate/* request 403s until the token is
 * re-minted. Role selection therefore calls this immediately afterwards.
 *
 * Server Actions and Route Handlers only — those are the only places the
 * cookie store is writable.
 */
export async function refreshSession(): Promise<boolean> {
  const jar = await cookies();
  const refreshToken = jar.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) return false;

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  }).catch(() => null);

  if (!res?.ok) return false;

  const body = await res.json().catch(() => null);
  const access = body?.data?.accessToken as string | undefined;
  const refresh = body?.data?.refreshToken as string | undefined;
  if (!access || !refresh) return false;

  jar.set(ACCESS_COOKIE, access, cookieOptions(ACCESS_MAX_AGE));
  jar.set(REFRESH_COOKIE, refresh, cookieOptions(REFRESH_MAX_AGE));
  return true;
}
