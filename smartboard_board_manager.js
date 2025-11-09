// smartboard/board_manager.js
// Controls Smart Board actions: explaining topics, showing diagrams, etc.

import { drawDiagram } from './board_drawer.js';
import { speakText } from '../ai/ai_voice_speaker.js';

export function handleSmartBoardAction(action = {}) {
  const { type, text } = action;

  if (type === 'explain') {
    speakText(`Let's learn about ${text}.`);
    drawDiagram(text);
  }

  if (type === 'summary') {
    speakText('Here’s a short summary of this chapter.');
  }

  if (type === 'stop') {
    speakText('Okay, stopping explanation.');
  }

  console.log('[SmartBoard]', type, text);
}