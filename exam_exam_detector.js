// exam/exam_detector.js
// Detect exam type from user profile or text.
// Simple rule-based detector; later replace with ML if needed.

export function detectExamFromProfile(profile = {}) {
  // profile.examType may be provided: 'neet', 'iit', 'upsc', 'boards'
  if (profile?.examType) return profile.examType.toLowerCase();
  // fallback to board or general
  if (profile?.board) {
    const b = String(profile.board).toLowerCase();
    if (b.includes('cbse') || b.includes('icse')) return 'boards';
  }
  return 'general';
}

export function detectExamFromText(text = '') {
  const t = String(text).toLowerCase();
  if (t.includes('neet') || t.includes('medical')) return 'neet';
  if (t.includes('jee') || t.includes('iit')) return 'iit';
  if (t.includes('upsc') || t.includes('civil services')) return 'upsc';
  if (t.includes('class') || t.includes('chapter') || t.includes('board')) return 'boards';
  return 'general';
}