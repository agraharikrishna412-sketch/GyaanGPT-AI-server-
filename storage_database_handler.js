// storage/database_handler.js
import { MongoClient } from 'mongodb';
import { config } from '../config.js';

let client = null;
let db = null;

export async function initDB() {
  const uri = config?.mongoURI || process.env.MONGO_URI || '';
  if (!uri) {
    console.warn('[initDB] No MONGO_URI provided — running in-memory fallback');
    return; // allow server to run without Mongo for dev
  }

  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  db = client.db(process.env.MONGO_DB_NAME || 'gyaangpt');
  console.log('✅ MongoDB connected');
}

/** Save a conversation record */
export async function saveConversation(userId, payload = {}) {
  if (!db) {
    // fallback: append to local JSON (dev only)
    const fname = './data/backups/local_conversations.json';
    try {
      const arr = (await import('fs')).readFileSync(fname, 'utf8');
      // if exists append (quick dev fallback - not robust)
    } catch (e) {
      // create file on first write
      (await import('fs')).writeFileSync(fname, JSON.stringify([{ userId, ...payload, ts: Date.now() }], null, 2));
      return;
    }
    return;
  }
  const col = db.collection('conversations');
  await col.insertOne({ userId, ...payload, ts: new Date() });
}

/** Save progress/upsert */
export async function saveProgress(userId, subject, data = {}) {
  if (!db) return;
  const col = db.collection('progress');
  await col.updateOne(
    { userId, subject },
    { $set: { ...data, lastUpdated: new Date() } },
    { upsert: true }
  );
}

/** Fetch QBank / simple helper */
export async function findQuestions(query = {}, limit = 20) {
  if (!db) return [];
  const col = db.collection('qbank');
  return await col.find(query).limit(limit).toArray();
}

export { db, client };