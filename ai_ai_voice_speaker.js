// ai/ai_voice_speaker.js
// Converts AI's text into voice output (Text-to-Speech)

export function speakText(text = '') {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.pitch = 1.1;
    utter.rate = 1.0;
    utter.volume = 1.0;
    speechSynthesis.speak(utter);
  } else {
    console.log('[voice_speaker]', text);
  }
}