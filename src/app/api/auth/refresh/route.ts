import { NextResponse } from "next/server";
import { refreshSession } from "@/lib/session";

/**
 * Forces a token rotation from the client. Needed after a role change, because
 * the access token still carries the role it was minted with.
 */
export async function POST() {
  const ok = await refreshSession();
  if (!ok) {
    return NextResponse.json({ message: "Your session has expired." }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
