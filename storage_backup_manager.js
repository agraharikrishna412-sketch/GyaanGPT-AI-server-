// storage/backup_manager.js
import fs from 'fs';
import path from 'path';
import { config } from '../config.js';
import { db } from './database_handler.js';

const BACKUP_DIR = config.storagePath || './data/backups';
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });

export async function createBackup() {
  try {
    const ts = Date.now();
    const filename = path.join(BACKUP_DIR, `backup_${ts}.json`);

    // If db is available, export collections (simple approach)
    if (db) {
      const collections = await db.collections();
      const dump = {};
      for (const c of collections) {
        const name = c.collectionName;
        dump[name] = await c.find({}).limit(10000).toArray();
      }
      fs.writeFileSync(filename, JSON.stringify(dump, null, 2), 'utf8');
      return { ok: true, path: filename };
    } else {
      // fallback: create timestamp file
      fs.writeFileSync(filename, JSON.stringify({ ts, note: 'no-db-fallback' }), 'utf8');
      return { ok: true, path: filename, note: 'no-db' };
    }
  } catch (e) {
    console.error('[backup_manager] createBackup error', e);
    return { ok: false, error: String(e) };
  }
}

export async function restoreBackup(filePath) {
  try {
    if (!fs.existsSync(filePath)) return { ok: false, error: 'file not found' };
    const raw = fs.readFileSync(filePath, 'utf8');
    const dump = JSON.parse(raw);
    if (!db) return { ok: false, error: 'no-db' };

    for (const [colName, docs] of Object.entries(dump)) {
      const col = db.collection(colName);
      if (Array.isArray(docs) && docs.length) {
        await col.deleteMany({});
        await col.insertMany(docs);
      }
    }
    return { ok: true };
  } catch (e) {
    console.error('[backup_manager] restore error', e);
    return { ok: false, error: String(e) };
  }
}

export async function checkHealth() {
  try {
    const files = fs.readdirSync(BACKUP_DIR);
    return { ok: true, backups: files.length, last: files.sort().pop() || null };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}