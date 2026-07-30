import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE,
  REFRESH_COOKIE,
  REFRESH_MAX_AGE,
  cookieOptions,
} from "@/lib/auth-cookies";
import { forwardAuth } from "../_forward";

/**
 * Verifying the OTP activates the account AND signs the user in — the API
 * returns a token pair, which we store as httpOnly cookies exactly like login.
 * The user is still CUSTOMER at this point; they become an AFFILIATE at
 * /join/role.
 */
export async function POST(req: Request) {
  const { email, code } = await req.json();

  const result = await forwardAuth("/auth/verify-otp", { email, code }, "Verification failed");
  if (!result.ok) return result.res;

  const { accessToken, refreshToken, user } = result.data as {
    accessToken: string;
    refreshToken: string;
    user: unknown;
  };

  const response = NextResponse.json({ user });
  response.cookies.set(ACCESS_COOKIE, accessToken, cookieOptions(ACCESS_MAX_AGE));
  response.cookies.set(REFRESH_COOKIE, refreshToken, cookieOptions(REFRESH_MAX_AGE));
  return response;
}
