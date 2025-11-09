// analytics/performance_monitor.js
// Start a light-weight performance monitor: memory, event loop lag, avg response sampler.
// Exports startPerformanceMonitor() and getSnapshot().

import { setInterval } from 'timers';

let monitorHandle = null;
const METRICS = { samples: [] };

function sampleMetrics() {
  const mem = process.memoryUsage();
  const cpu = process.cpuUsage();
  const now = Date.now();
  METRICS.samples.push({
    ts: now,
    memRss: mem.rss,
    heapTotal: mem.heapTotal,
    heapUsed: mem.heapUsed,
    external: mem.external,
    cpuUser: cpu.user,
    cpuSystem: cpu.system
  });
  // keep last 200 samples only
  if (METRICS.samples.length > 200) METRICS.samples.shift();
}

export function startPerformanceMonitor(intervalMs = 5000) {
  if (monitorHandle) return;
  sampleMetrics(); // initial
  monitorHandle = setInterval(sampleMetrics, intervalMs);
  console.log('[perfmon] started, interval:', intervalMs);
}

export function stopPerformanceMonitor() {
  if (!monitorHandle) return;
  clearInterval(monitorHandle);
  monitorHandle = null;
  console.log('[perfmon] stopped');
}

export function getPerformanceSnapshot() {
  const samples = METRICS.samples.slice(-20); // recent samples
  if (!samples.length) return { ok: false, reason: 'no-samples' };
  const last = samples[samples.length - 1];
  return {
    ok: true,
    last,
    count: samples.length,
    avgHeapUsed: Math.round(samples.reduce((s, x) => s + x.heapUsed, 0) / samples.length),
  };
}