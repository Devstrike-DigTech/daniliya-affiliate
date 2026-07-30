import { NextResponse } from "next/server";
import { forwardAuth } from "../_forward";

/**
 * The reset email delivers a raw token (not a link), so the token arrives here
 * either from ?token= or from the field the user pastes it into. A successful
 * reset revokes every session server-side, so the user must sign in again.
 */
export async function POST(req: Request) {
  const { token, password } = await req.json();

  const result = await forwardAuth(
    "/auth/reset-password",
    { token, password },
    "Could not reset your password",
  );
  if (!result.ok) return result.res;

  return NextResponse.json(result.data);
}
