import fs from 'fs';
import { config } from '../config.js';

export async function backupData() {
  // Simple local JSON backup (for dev)
  const data = { timestamp: new Date() };
  fs.writeFileSync(`${config.storagePath}/backup_${Date.now()}.json`, JSON.stringify(data, null, 2));
  return { status: 'success', path: `${config.storagePath}` };
}