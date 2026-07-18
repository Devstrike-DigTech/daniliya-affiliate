"use server";

import { apiFetch, ApiError } from "@/lib/api";

export type PasswordState = { ok: boolean; message: string } | null;

/**
 * POST /auth/change-password. The API validates the current password and the
 * new password's strength rule, so its message is surfaced verbatim.
 */
export async function changePassword(
  _prev: PasswordState,
  formData: FormData,
): Promise<PasswordState> {
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!currentPassword || !newPassword) {
    return { ok: false, message: "Enter your current and new password." };
  }
  if (newPassword !== confirmPassword) {
    return { ok: false, message: "The new passwords don't match." };
  }

  try {
    await apiFetch("/auth/change-password", {
      method: "POST",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return { ok: true, message: "Password updated." };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof ApiError ? err.message : "Something went wrong.",
    };
  }
}
