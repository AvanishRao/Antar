import test from 'node:test';
import assert from 'node:assert/strict';
import { themes, sources, questions } from '../public/content.js';
import { scoreAnswers, readSaved, escapeHTML } from '../public/model.js';

test('unanswered, sparse, out-of-range and nonnumeric answers are rejected', () => {
  for (const input of [null, [], Array(12), Array(12).fill(null), Array(12).fill(4), Array(12).fill(-1), Array(12).fill('1'), Array(12).fill(0.5)]) {
    assert.throws(() => scoreAnswers(input), /answer every question/);
  }
});
test('all-zero answers do not invent a dominant theme', () => {
  assert.deepEqual(scoreAnswers(Array(12).fill(0)).top, []);
});
test('ties are preserved and order is stable', () => {
  assert.deepEqual(scoreAnswers(Array(12).fill(2)).top, themes.map(t => t.id));
  const answers = questions.map(q => ['krodha', 'mada'].includes(q.theme) ? 3 : 0);
  const result = scoreAnswers(answers);
  assert.deepEqual(result.top, ['krodha', 'mada']);
  assert.equal(result.scores.krodha, 6);
});
test('each theme receives exactly its own two answers', () => {
  for (const theme of themes) {
    const result = scoreAnswers(questions.map(q => q.theme === theme.id ? 3 : 1));
    assert.deepEqual(result.top, [theme.id]);
    assert.equal(result.highest, 6);
  }
});
test('content references resolve to sources with explicit editions and HTTPS links', () => {
  assert.equal(new Set(sources.map(s => s.id)).size, sources.length);
  for (const theme of themes) {
    assert.equal(questions.filter(q => q.theme === theme.id).length, 2);
    for (const id of theme.sourceIds) assert.ok(sources.some(s => s.id === id));
  }
  for (const source of sources) {
    assert.equal(new URL(source.url).protocol, 'https:');
    assert.ok(source.edition && source.context && source.application);
    for (const tag of source.tags) assert.ok(themes.some(t => t.id === tag));
  }
});
test('saved data tolerates unavailable or corrupt storage', () => {
  assert.deepEqual(readSaved({ getItem() { throw new Error('blocked'); } }), []);
  for (const data of ['{', '{}', 'null', '[null,{},false]']) {
    assert.deepEqual(readSaved({ getItem: () => data }), []);
  }
});
test('saved data rejects invalid entries, strips extra fields and limits size', () => {
  const entry = { id:'test', theme:'krodha', note:'x'.repeat(2100), action:'pause', date:'2026-10-16T00:00:00Z', unexpected:'strip' };
  const result = readSaved({ getItem: () => JSON.stringify([{...entry,theme:'unknown'}, {...entry,date:'invalid'}, ...Array(101).fill(entry)]) });
  assert.equal(result.length, 100);
  assert.equal(result[0].note.length, 2000);
  assert.equal(result[0].unexpected, undefined);
});
test('HTML metacharacters from private notes cannot become markup', () => {
  assert.equal(escapeHTML('<img src=x onerror="alert(1)"> & \'text\''), '&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; &#39;text&#39;');
});
