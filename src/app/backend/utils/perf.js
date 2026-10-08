// Lightweight server timing. Logs only slow operations (>= PERF_SLOW_MS, default 500ms) so
// production logs stay quiet; set PERF_LOG=1 to log every timed call (e.g. to count DB hits).
const SLOW_MS = Number(process.env.PERF_SLOW_MS) || 500;
const LOG_ALL = process.env.PERF_LOG === "1";

export async function timed(label, fn) {
  const start = performance.now();
  try {
    return await fn();
  } finally {
    const ms = Math.round(performance.now() - start);
    if (LOG_ALL || ms >= SLOW_MS) {
      console.warn(`[perf] ${label} ${ms}ms`);
    }
  }
}
