import { detectIntent } from './intent_classifier.js';
import { detectMood } from './mood_detector.js';
import { routeToAI } from './ai_router.js';
import { modifyTone } from './tone_modifier.js';
import { saveConversation } from '../storage/database_handler.js';

export async function handleMessage({ userId, text, lang }) {
  const intent = await detectIntent(text);
  const mood = await detectMood(text);
  const primaryAI = choosePrimary(intent); // Llama / DeepSeek / Claude
  const primaryResp = await routeToAI(primaryAI, { text, userId, lang });

  const finalResp = (mood === 'bored') 
      ? await routeToAI('claude', { text: primaryResp.text, task: 'make_funny' })
      : primaryResp;

  const cleaned = await modifyTone(finalResp.text, { mood, lang });
  await saveConversation(userId, { input: text, output: cleaned, meta: { primaryAI, mood } });
  return { replyText: cleaned, sourceAI: primaryAI };
}

function choosePrimary(intent) {
  if(intent === 'study') return 'deepseek';
  return 'llama';
}