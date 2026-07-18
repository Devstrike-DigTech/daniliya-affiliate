/**
 * Shared shape for every join action's result.
 *
 * This lives outside `actions.ts` because a `"use server"` module may only
 * export async functions — exporting the IDLE constant from there is a build
 * error.
 */
export type ActionState = { error: string | null };

export const IDLE: ActionState = { error: null };
