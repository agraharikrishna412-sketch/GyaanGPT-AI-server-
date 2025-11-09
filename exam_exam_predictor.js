// exam/exam_predictor.js
// Predict probable questions and generate QBank entries (placeholder logic).
// Integrates with exam_pattern and optionally AI connectors via callers.

import { getTopTopicsWithProbability } from './exam_pattern.js';
import { saveQuestionToQBank } from '../storage/qbank_helper.js'; // optional helper - see note

/**
 * predictQuestions:
 * @param {Array} pastPapers - past paper array
 * @param {Object} opts - { countPerTopic, difficulty, examType }
 * @returns predictedQuestions: [{ topic, predictedQ, probability, difficulty }]
 */
export function predictQuestions(pastPapers = [], opts = {}) {
  const { countPerTopic = 2, difficulty = 'medium' } = opts;
  const topics = getTopTopicsWithProbability(pastPapers, 12);
  const predicted = [];

  for (const t of topics) {
    for (let i = 0; i < countPerTopic; i++) {
      // basic templated prediction; production: call DeepSeek or LLaMA to generate phrasing
      const qText = `Explain key concept of ${t.topic} (predicted question ${i + 1})`;
      predicted.push({
        topic: t.topic,
        predictedQ: qText,
        probability: t.probability,
        difficulty
      });
    }
  }

  return predicted;
}

/**
 * Optionally persist predicted Qs into QBank (if helper available)
 */
export async function predictAndSave(pastPapers = [], opts = {}) {
  const preds = predictQuestions(pastPapers, opts);
  // save to QBank if helper available (wrapped in try/catch)
  try {
    if (typeof saveQuestionToQBank === 'function') {
      for (const p of preds) {
        await saveQuestionToQBank({ examType: opts.examType || 'general', ...p });
      }
    }
  } catch (e) {
    // non-fatal
    console.warn('[exam_predictor] qbank save failed', e);
  }
  return preds;
}