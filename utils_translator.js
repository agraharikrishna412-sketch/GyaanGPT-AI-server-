// utils/translator.js
// Simple wrapper: plug any translator API (Google/Azure) or use local fallback.
import fetch from 'node-fetch';
import { config } from '../config.js';

export async function translateText(text, targetLang = 'en') {
  // If TRANSLATOR_KEY not set, return original text (fallback)
  if (!config?.apiKeys?.translator) return { text, from: null, to: targetLang };

  try {
    const resp = await fetch('https://api.your-translator.service/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKeys.translator}`
      },
      body: JSON.stringify({ q: text, target: targetLang })
    });
    const data = await resp.json();
    // adapt according to actual API response shape
    return { text: data.translatedText || text, from: data.detectedSource || null, to: targetLang };
  } catch (err) {
    console.error('[translator] error:', err);
    return { text, from: null, to: targetLang };
  }
}