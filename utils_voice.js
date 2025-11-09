// utils/voice.js
// STT/TTS helper wrappers. For production plug cloud STT/TTS (Google/Azure/Coqui).
import fs from 'fs';
import path from 'path';
import { config } from '../config.js';

// Placeholder TTS: save text -> simple file (real system should call cloud TTS)
export async function textToSpeech(text, opts = {}) {
  try {
    const filename = `tts_${Date.now()}.txt`; // placeholder: use .mp3 in real TTS
    const full = path.join(config.storagePath || './data/backups', filename);
    fs.writeFileSync(full, text, 'utf8');
    return { ok: true, url: full, note: 'Local placeholder file (use cloud TTS for audio).' };
  } catch (e) {
    console.error('[tts] error', e);
    return { ok: false, error: String(e) };
  }
}

// Placeholder STT: accepts base64 audio and returns mock transcript.
// Replace with Google Speech-to-Text / Vosk / Coqui for production.
export async function speechToText(base64Audio, opts = {}) {
  try {
    // In dev: don't decode heavy audio, just return placeholder.
    return { transcript: 'transcript placeholder', confidence: 0.85 };
  } catch (e) {
    console.error('[stt] error', e);
    return { transcript: '', confidence: 0 };
  }
}