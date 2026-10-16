# Antar implementation plan

Working scope: a Vercel-hosted interactive website, built for a solo founder. Shadripu provides six reflection themes. The first release uses explicitly labeled sample guidance, not live AI. The source repository is https://github.com/AvanishRao/Antar.

## Delivery sequence

1. **Product foundation — implemented, verification pending.** Six themes, gentle self-report questions, original source-linked summaries, clear distinction between scripture and modern application.
2. **Interactive prototype — in progress.** Responsive home, 12-question check-in, tied/neutral results, theme reflections, searchable library, local saving/export/deletion, and an explanation of the approach.
3. **Quality review — pending.** Verify scoring edge cases, output escaping, storage failure handling, keyboard access, narrow-screen layout, browser flows, and the production build. Check source references and avoid claims of scholarly or psychological validation.
4. **GitHub publication — pending.** Preserve existing repository state, commit source and documentation, push to the supplied repository, verify the remote commit. Do not upload the user's concept PDF, private notes, credentials, build caches, or browser state.
5. **Vercel deployment — pending.** Authenticate with the user's assistance if needed, deploy this exact project, inspect the result, and test the live URL. No paid upgrade or domain purchase is included.
6. **LLM preparation — in progress.** Export a structured draft knowledge corpus, define response and retrieval contracts, separate training examples from evaluation cases, and document the human-review requirements. Actual model training and live inference are a later phase.

## Acceptance criteria

- The prototype is functional on phone and desktop sizes, with keyboard-operable controls.
- All six themes can be selected directly; quiz results never restrict content.
- The check-in requires all 12 responses, preserves answers when going back, shows tied themes, and does not assign a dominant theme for all-zero answers.
- Guidance is explicitly sample content. A free-text note is not presented as AI-analyzed.
- Source cards distinguish the passage summary, narrative/spiritual context, modern application, and linked edition.
- Notes are saved only when requested, with accurate browser-local privacy language. Export and deletion work.
- No external font, analytics, model API, or advertising dependency is required for the prototype.
- Future LLM datasets exclude user writing and identify draft/review/licensing status.
- Tests and production build pass; GitHub and Vercel state are verified before declaring delivery complete.

## Later AI milestone

Start with retrieval over reviewed passages and original commentary, then evaluate whether fine-tuning improves response structure and tone. The six themes are topic tags, not psychological diagnoses. Fine-tuning is not a replacement for source attribution. See `AI_READINESS.md` for the implementation boundary and review gates.
