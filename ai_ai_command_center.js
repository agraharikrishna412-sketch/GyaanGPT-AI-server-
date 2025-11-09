// ai/ai_command_center.js
// Central command processor for main AI — listens to instructions & dispatches actions

import { analyzeMood } from './ai_mood_engine.js';
import { speakText } from './ai_voice_speaker.js';
import { handleSmartBoardAction } from '../smartboard/board_manager.js';

export function processAICommand(input = '', context = {}) {
  const text = String(input).toLowerCase();

  // Detect mood & context
  const mood = analyzeMood(text, context.userMood || 'neutral');

  // Command handling
  if (text.includes('explain') || text.includes('chapter')) {
    handleSmartBoardAction({ type: 'explain', text });
    return 'Explaining the topic on Smart Board...';
  }

  if (text.includes('motivate') || mood === 'sad') {
    speakText('Don’t worry, I believe in you! Let’s conquer this topic together!');
    return 'Motivation mode activated';
  }

  if (text.includes('funny') || mood === 'bored') {
    speakText('Haha, let’s make learning fun! Ready for a quiz with a twist?');
    return 'Switched to fun mode';
  }

  return 'Command received. Waiting for further instructions.';
}