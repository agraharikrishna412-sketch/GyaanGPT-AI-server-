// analytics/analytics_tracker.js
// Lightweight event tracker: counts per event type, top users actions, simple in-memory store.
// For production, forward events to DB or external analytics.

const COUNTERS = { events: {}, users: {} };

/**
 * trackEvent(name, metadata)
 */
export function trackEvent(name = 'unknown', metadata = {}) {
  COUNTERS.events[name] = (COUNTERS.events[name] || 0) + 1;
  if (metadata?.userId) {
    const u = metadata.userId;
    COUNTERS.users[u] = COUNTERS.users[u] || { events: 0, last: Date.now() };
    COUNTERS.users[u].events += 1;
    COUNTERS.users[u].last = Date.now();
  }
}

/**
 * getStats()
 */
export function getAnalyticsSnapshot() {
  const topEvents = Object.entries(COUNTERS.events)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([k, v]) => ({ name: k, count: v }));

  return {
    ok: true,
    topEvents,
    usersCount: Object.keys(COUNTERS.users).length
  };
}

// optional: expose reset
export function resetAnalytics() {
  COUNTERS.events = {};
  COUNTERS.users = {};
}