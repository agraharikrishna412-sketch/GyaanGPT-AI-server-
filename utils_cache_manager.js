// utils/cache_manager.js
// Very small in-memory cache with TTL. For prod swap to Redis.
const CACHE = new Map();

/**
 * setCache(key, value, ttlSeconds)
 */
export function setCache(key, value, ttlSeconds = 300) {
  const expiresAt = Date.now() + ttlSeconds * 1000;
  CACHE.set(key, { value, expiresAt });
}

/**
 * getCache(key) -> value | null
 */
export function getCache(key) {
  const row = CACHE.get(key);
  if (!row) return null;
  if (Date.now() > row.expiresAt) {
    CACHE.delete(key);
    return null;
  }
  return row.value;
}

/**
 * clearCache(prefix?) -> clears all or keys that startWith prefix
 */
export function clearCache(prefix = null) {
  if (!prefix) {
    CACHE.clear();
    return;
  }
  for (const key of CACHE.keys()) {
    if (String(key).startsWith(prefix)) CACHE.delete(key);
  }
}