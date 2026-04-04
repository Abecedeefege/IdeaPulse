/**
 * When true (default), skip per-day batch limits and similar-ideas request_logs caps.
 * Set DISABLE_DAILY_BATCH_LIMIT=0 to enforce limits (e.g. after billing).
 */
export function isDailyBatchLimitDisabled(): boolean {
  const v = process.env.DISABLE_DAILY_BATCH_LIMIT?.trim().toLowerCase();
  if (v === "0" || v === "false" || v === "no") return false;
  return true;
}
