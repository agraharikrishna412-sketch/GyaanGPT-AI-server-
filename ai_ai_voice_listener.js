// ai/ai_voice_listener.js
// Handles voice input from user and converts it to text (Speech-to-Text)

import { processAICommand } from './ai_command_center.js';
import { speakText } from './ai_voice_speaker.js';

export async function startVoiceListener(mockVoiceInput = '') {
  // NOTE: In production, integrate with Web Speech API or native STT module
  const userSpeech = mockVoiceInput || 'Explain photosynthesis';
  console.log('[voice_listener] heard:', userSpeech);
  
  const aiReply = processAICommand(userSpeech);
  speakText(aiReply);
  
  return aiReply;
}