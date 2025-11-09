// utils/timezone.js
import moment from 'moment-timezone';

// Get user's local time (pass timezone string or fallback to Asia/Kolkata)
export function getUserTimeInfo(timezone = 'Asia/Kolkata') {
  try {
    const now = moment().tz(timezone);
    return {
      timezone,
      iso: now.toISOString(),
      localTime: now.format('YYYY-MM-DD HH:mm:ss'),
      hour: now.hour(),
      minute: now.minute()
    };
  } catch (e) {
    console.error('[timezone] error', e);
    const fallback = moment().tz('Asia/Kolkata');
    return {
      timezone: 'Asia/Kolkata',
      iso: fallback.toISOString(),
      localTime: fallback.format('YYYY-MM-DD HH:mm:ss'),
      hour: fallback.hour(),
      minute: fallback.minute()
    };
  }
}