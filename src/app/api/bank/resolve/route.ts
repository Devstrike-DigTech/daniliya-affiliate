import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";
import { ACCESS_COOKIE } from "@/lib/auth-cookies";

/**
 * Name-enquiry proxy: resolve an account name from a number + bank code.
 *
 * The KYC form calls this as the account number is typed so the applicant sees
 * whose account it is before submitting. The API endpoint needs the session
 * bearer (an httpOnly cookie the browser can't read), so it's forwarded here.
 */
export async function POST(req: Request) {
  const token = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const res = await fetch(`${API_URL}/banks/resolve`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body ?? {}),
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const m = data?.message;
    return NextResponse.json(
      { error: Array.isArray(m) ? m.join(", ") : (m ?? "Could not verify that account.") },
      { status: res.status },
    );
  }
  return NextResponse.json(data?.data ?? data);
}
