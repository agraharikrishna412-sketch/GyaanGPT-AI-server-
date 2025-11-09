import fetch from 'node-fetch';
import { config } from '../config.js';

export async function callClaude({ text, task }) {
  // Simple placeholder for Claude API call
  const response = await fetch('https://api.claude.ai/query', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${config.apiKeys.claude}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, task })
  });
  const data = await response.json();
  return { text: data.reply || "Claude reply missing" };
}