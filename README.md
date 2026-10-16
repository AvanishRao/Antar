# Antar

A little space within. A responsive Hindu wisdom reflection prototype built for Vercel, with no runtime dependencies or live AI service.

## Run locally

Requires Node.js 22 or newer.

```sh
npm run dev
```

Open http://127.0.0.1:4173. To verify and build:

```sh
npm test
npm run export-data
npm run build
```

Vercel uses `npm run build` and serves `dist`. No environment variables are required. Deploy the repository with the included `vercel.json`, or run `npx vercel --prod` after signing in.

## Prototype features

- Six Shadripu-inspired reflection themes and a 12-question check-in with tied and neutral results.
- Nine source-linked editorial reflections from the Bhagavad Gita and Ramayana, with search and filters.
- Private notes saved only on request to this browser's localStorage; export and deletion controls.
- Responsive layouts, native keyboard controls, skip navigation, reduced-motion support and no external fonts or analytics.

The check-in is not a validated psychological assessment. The content is original editorial paraphrase, not a scripture translation, and requires scholarly review. Labels are accessible entry points, not complete translations of Sanskrit terms. No user account, cross-device sync, live model, model training, or free-text analysis is implemented in this prototype.

Saved notes are not encrypted by this website. Other people using the browser profile may read them, and browser cleanup can erase them. Hosting processes ordinary requests; visiting a source link contacts the publisher.

## Project structure

`public/` contains the complete website. `public/content.js` owns the editorial content, `model.js` the scoring/storage validation, and `app.js` the interface. `scripts/` contains the local server, production build and deterministic corpus export. `tests/` covers scoring, content references, escaping and storage validation. `data/` contains only draft editorial/synthetic data, never user reflections.

See [PLAN.md](PLAN.md) for delivery scope and [AI_READINESS.md](AI_READINESS.md) for the future retrieval, review, evaluation and fine-tuning workflow. No dataset in this repository is approved for training yet.
