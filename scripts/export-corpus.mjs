import { mkdir, writeFile } from 'node:fs/promises';
import { themes, sources } from '../public/content.js';

// Deliberately reads only editorial content. Never reads localStorage or user notes.
const corpus = sources.map(source => ({
  schemaVersion: 1,
  id: source.id,
  work: source.book,
  reference: source.ref,
  sourceUrl: source.url,
  edition: source.edition,
  title: source.title,
  themes: source.tags,
  passageSummary: source.summary,
  context: source.context,
  modernApplication: source.application,
  reflectionPrompt: source.prompt,
  contentType: 'original_editorial_paraphrase',
  reviewStatus: 'draft',
  rightsStatus: 'review_required_no_translation_text_included',
  trainingEligible: false,
}));
const examples = themes.map(theme => ({
  schemaVersion: 1,
  id: `draft-${theme.id}-01`,
  provenance: 'synthetic_editorial_example_not_user_data',
  reviewStatus: 'draft',
  trainingEligible: false,
  input: { situation: theme.scenarios[0], selectedTheme: theme.id },
  targetResponse: {
    acknowledgment: theme.description,
    perspective: sources.find(source => source.id === theme.sourceIds[0]).application,
    sourceIds: [theme.sourceIds[0]],
    reflectionQuestion: theme.question,
    smallPractice: theme.action,
    caveat: theme.note,
  },
}));
const directory = new URL('../data/', import.meta.url);
await mkdir(directory, { recursive: true });
for (const [name, rows] of [['knowledge-base.draft.jsonl', corpus], ['response-examples.draft.jsonl', examples]]) {
  await writeFile(new URL(name, directory), rows.map(row => JSON.stringify(row)).join('\n') + '\n');
}
console.log(`Exported ${corpus.length} draft passages and ${examples.length} synthetic examples. None approved for training.`);
