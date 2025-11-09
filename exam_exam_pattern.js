// exam/exam_pattern.js
// Analyze simple past-paper patterns (topic frequency).
// This is a lightweight implementation: expects preloaded 'pastPapers' array (from DB or JSON).

/**
 * pastPapers: [
 *   { year: 2024, questions: [{ topic: 'Newton', difficulty: 'medium' }, ...] },
 *   ...
 * ]
 */

export function buildTopicFrequency(pastPapers = []) {
  const freq = {};
  for (const paper of pastPapers) {
    if (!paper?.questions) continue;
    for (const q of paper.questions) {
      const topic = (q.topic || 'unknown').toLowerCase();
      freq[topic] = (freq[topic] || 0) + 1;
    }
  }
  // convert to sorted array
  const arr = Object.entries(freq).map(([topic, count]) => ({ topic, count }));
  arr.sort((a, b) => b.count - a.count);
  return arr;
}

/**
 * return top N topics with normalized probability (0-1)
 */
export function getTopTopicsWithProbability(pastPapers = [], topN = 10) {
  const arr = buildTopicFrequency(pastPapers);
  const max = arr.length ? arr[0].count : 1;
  return arr.slice(0, topN).map(item => ({
    topic: item.topic,
    count: item.count,
    probability: +(item.count / max).toFixed(3)
  }));
}