# Antar: path to a grounded guidance model

The current website is a deterministic interactive prototype. It does not call an LLM, analyze private writing, collect conversations, or train a model. The draft content is scaffolding for editorial review, not a sufficient or approved training set.

## Data already prepared

- `public/content.js`: versioned editorial content used by the website.
- `data/knowledge-base.draft.jsonl`: nine passages with stable IDs, exact references, linked editions, summaries, context, modern applications, tags, review status and rights status.
- `data/response-examples.draft.jsonl`: six synthetic examples of the response structure. These are provider-neutral examples, not an API-specific fine-tuning upload.
- `data/evaluation-cases.json`: held-out scenarios and expected behavior, kept separate from training examples.
- `npm run export-data`: deterministic regeneration from editorial content only. No private reflections are read.

Every exported record has `trainingEligible: false`. This must stay false until the content and its rights are reviewed. Links to translations do not grant permission to reproduce those translations in a corpus. The export contains original paraphrases, not translated scripture text.

## Founder roadmap and release gates

1. **Content review (planning estimate: 1–2 weeks).** Choose the Gita and Ramayana editions, confirm permitted uses, recruit a qualified reader/scholar, and review the existing nine passages. Preserve spiritual and narrative context. Record reviewer, date, revision, rights basis, and disputed interpretations per record. The six Shadripu categories are editorial discovery tags, not diagnoses; do not claim they are the Christian seven deadly sins.
2. **Retrieval baseline (1–2 weeks).** Grow a small reviewed corpus covering the situations users actually bring. Build a server-only retrieval endpoint, initially using straightforward search and theme filters. Add embeddings only if measured retrieval quality warrants them. Retrieve passage IDs, context and attribution together; use only approved records.
3. **Evaluation before training (about 1 week).** Compare a prompted base model plus retrieval against expert-reviewed expected behavior. Check citation accuracy, unsupported claims, tone, practical usefulness and refusal to blame people for harm done to them. Version the model, prompt, corpus and test set so results can be reproduced.
4. **Fine-tuning experiment (time depends on model and data).** If the baseline still has recurring style or response-structure failures, curate varied human-reviewed examples and run a small controlled fine-tuning experiment. Split by scenario families and source clusters to reduce leakage. Keep the holdout private from training. Fine-tune behavior and format; keep changing knowledge in retrieval. Do not train a foundation model from scratch for this prototype.
5. **Private pilot and launch gate.** Compare baseline and candidate on the same held-out cases. Require valid source IDs in every cited answer, no invented quotations, no critical failures on crisis/abuse cases, and human review of usefulness and religious context. These are proposed gates, not results achieved today. Add feedback, deletion, access controls, rate limits and cost monitoring before public live inference.

Estimates are planning assumptions for a solo founder using AI tools, not commitments. Scholar availability and data quality determine pace. Select a model/provider and verify current prices, supported training methods, data retention and terms when the experiment is ready.

## Future service boundary

Vercel hosts the UI and a server endpoint. The endpoint retrieves approved passages and calls a configured model provider. Training jobs run separately with the selected training provider or compute environment, not inside a web request. Keep API credentials server-side in environment variables. The current site has no credentials or inference endpoint.

Request: a user-selected theme, an optional situation, and explicit permission to send that situation to the service. The model must not infer a permanent personality from it. Do not automatically send existing browser-local notes when AI is introduced.

Response contract:

```json
{
  "acknowledgment": "A brief, nonjudgmental acknowledgment",
  "perspective": "A grounded interpretation, explicitly distinguished from scripture",
  "sourceIds": ["approved-passage-id"],
  "reflectionQuestion": "One useful question",
  "smallPractice": "One feasible next step",
  "caveat": "Relevant limits or uncertainty"
}
```

Validate the response schema and ensure cited IDs are in the retrieved approved set. Resolve source links from the server's corpus; never trust model-invented links. If evidence is insufficient, say so instead of fabricating a verse. Treat user text and retrieved material as data, not instructions that can alter service policy. Log operational metadata without retaining private situations by default.

## Consent and dataset governance

User notes and future conversations are excluded from training by default. Any later contribution flow must be separate, optional and explicit about what is shared, review, retention and withdrawal limits. Do not turn a save action or ordinary product consent into permission to train. Use synthetic or commissioned examples first; remove identifiers and review them before approval.

Keep approved training examples, development cases and held-out evaluation sets separate. The sample files committed here are public draft scaffolding: replace or expand evaluation cases before treating them as a reliable benchmark. Store actual training runs with dataset hashes, model IDs, hyperparameters, evaluation results and reviewer decisions in a controlled location.
