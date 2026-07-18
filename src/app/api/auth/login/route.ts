import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";
import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE,
  REFRESH_COOKIE,
  REFRESH_MAX_AGE,
  cookieOptions,
} from "@/lib/auth-cookies";

/**
 * Exchanges credentials for tokens and stores them as httpOnly cookies, so the
 * browser never sees a token.
 *
 * CUSTOMER is allowed through deliberately: a new signup holds that role until
 * they pick one in /join/role, so rejecting it would lock people out of the
 * very flow that makes them an affiliate. Vendors, creators and admins have
 * their own portals and are refused here.
 */
const ALLOWED_ROLES = new Set(["AFFILIATE", "CUSTOMER"]);
export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const raw = body?.message;
    return NextResponse.json(
      { message: Array.isArray(raw) ? raw.join(", ") : (raw ?? "Sign in failed") },
      { status: res.status },
    );
  }

  const { accessToken, refreshToken, user } = body.data;
  if (!ALLOWED_ROLES.has(user?.role)) {
    return NextResponse.json(
      { message: "This account does not belong to the affiliate programme." },
      { status: 403 },
    );
  }

  const response = NextResponse.json({ user });
  response.cookies.set(ACCESS_COOKIE, accessToken, cookieOptions(ACCESS_MAX_AGE));
  response.cookies.set(REFRESH_COOKIE, refreshToken, cookieOptions(REFRESH_MAX_AGE));
  return response;
}
