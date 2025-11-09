import fetch from 'node-fetch';
import { config } from '../config.js';

export async function callDeepSeek({ text, userId, lang }) {
  // Simple placeholder for DeepSeek API call
  const response = await fetch('https://api.deepseek.ai/query', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${config.apiKeys.deepseek}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, userId, lang })
  });
  const data = await response.json();
  return { text: data.reply || "DeepSeek reply missing" };
}