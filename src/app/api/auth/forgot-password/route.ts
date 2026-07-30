import { NextResponse } from "next/server";
import { forwardAuth } from "../_forward";

/**
 * The API deliberately returns the same message whether or not the email is
 * registered, so the UI must not claim an email was definitely sent to a known
 * account.
 */
export async function POST(req: Request) {
  const { email } = await req.json();
  const origin = req.headers.get("origin");
  const resetUrl = origin ? `${origin}/reset-password` : undefined;

  const result = await forwardAuth(
    "/auth/forgot-password",
    { email, ...(resetUrl ? { resetUrl } : {}) },
    "Could not start the password reset",
  );
  if (!result.ok) return result.res;

  return NextResponse.json(result.data);
}
