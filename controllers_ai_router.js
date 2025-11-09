import { callDeepSeek } from '../connectors/deepseek_connector.js';
import { callClaude } from '../connectors/claude_connector.js';
import { callGPT } from '../connectors/gpt_connector.js';
import { callLlama } from '../connectors/llama_connector.js';

export async function routeToAI(aiName, payload) {
  switch(aiName) {
    case 'deepseek': return await callDeepSeek(payload);
    case 'claude': return await callClaude(payload);
    case 'gpt': return await callGPT(payload);
    case 'llama': return await callLlama(payload);
    default: return { text: "AI not found" };
  }
}