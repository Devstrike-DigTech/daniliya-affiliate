import { NextResponse } from "next/server";
import { forwardAuth } from "../_forward";

/** The API enforces a 50s cooldown and returns 400 if you ask too soon. */
export async function POST(req: Request) {
  const { email } = await req.json();

  const result = await forwardAuth("/auth/resend-otp", { email }, "Could not resend the code");
  if (!result.ok) return result.res;

  return NextResponse.json(result.data);
}
