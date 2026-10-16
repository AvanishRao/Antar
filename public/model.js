import { themes, questions } from './content.js';

export function scoreAnswers(answers) {
  if (!Array.isArray(answers) || answers.length !== questions.length || Array.from(answers).some(v => !Number.isInteger(v) || v < 0 || v > 3)) throw new Error('Please answer every question.');
  const scores = Object.fromEntries(themes.map(t => [t.id, 0]));
  answers.forEach((answer, i) => scores[questions[i].theme] += answer);
  const highest = Math.max(...Object.values(scores));
  return { scores, highest, top: highest === 0 ? [] : themes.filter(t => scores[t.id] === highest).map(t => t.id), ranked: [...themes].sort((a,b) => scores[b.id] - scores[a.id]).map(t => t.id) };
}

export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

export function readSaved(storage) {
  try {
    const value = JSON.parse(storage.getItem('antar.reflections.v1') || '[]');
    if (!Array.isArray(value)) return [];
    return value.filter(e => e && typeof e.id === 'string' && themes.some(t => t.id === e.theme) && typeof e.note === 'string' && typeof e.action === 'string' && typeof e.date === 'string' && Number.isFinite(Date.parse(e.date))).slice(0,100).map(e => ({id:e.id.slice(0,100),theme:e.theme,note:e.note.slice(0,2000),action:e.action.slice(0,2000),date:e.date}));
  } catch { return []; }
}

export function getTheme(id) { return themes.find(t => t.id === id) || null; }
