import { NextResponse } from "next/server";
import { forwardAuth } from "../_forward";

/**
 * Creates the account and triggers the 6-digit email OTP. No tokens are issued
 * here — the API only signs you in once the code is verified, so no cookies
 * are set at this stage.
 */
export async function POST(req: Request) {
  const { firstName, lastName, email, phone, password } = await req.json();

  const result = await forwardAuth(
    "/auth/register",
    { firstName, lastName, email, phone: phone || undefined, password },
    "Sign up failed",
  );
  if (!result.ok) return result.res;

  return NextResponse.json(result.data);
}
