// ai/ai_mood_engine.js
// Detects user mood and modifies AI behavior accordingly

const moodKeywords = {
  happy: ['great', 'awesome', 'yay', 'fun'],
  sad: ['tired', 'bored', 'sad', 'bad'],
  angry: ['angry', 'frustrated', 'irritated'],
  bored: ['boring', 'dull', 'nothing']
};

export function analyzeMood(text = '', defaultMood = 'neutral') {
  const t = text.toLowerCase();
  for (const [mood, keys] of Object.entries(moodKeywords)) {
    if (keys.some(k => t.includes(k))) return mood;
  }
  return defaultMood;
}

export function modifyResponseTone(response = '', mood = 'neutral') {
  switch (mood) {
    case 'happy': return `😄 ${response}`;
    case 'sad': return `💫 Hey, don’t feel low — ${response}`;
    case 'angry': return `😌 Let’s calm down and focus — ${response}`;
    case 'bored': return `🎲 Let’s make it interesting — ${response}`;
    default: return response;
  }
}