export async function detectIntent(text) {
  text = text.toLowerCase();
  if(text.includes('explain') || text.includes('study') || text.includes('question')) return 'study';
  if(text.includes('joke') || text.includes('fun')) return 'fun';
  return 'general';
}