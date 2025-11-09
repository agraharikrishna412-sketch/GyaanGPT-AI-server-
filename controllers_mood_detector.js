export async function detectMood(text) {
  text = text.toLowerCase();
  if(text.includes('boring') || text.includes('tired')) return 'bored';
  if(text.includes('sad') || text.includes('upset')) return 'sad';
  return 'neutral';
}