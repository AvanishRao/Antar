# Antar implementation plan

Working scope: a Vercel-hosted interactive website, built for a solo founder. Shadripu provides six reflection themes. The first release uses explicitly labeled sample guidance, not live AI. The source repository is https://github.com/AvanishRao/Antar.

## Delivery sequence

1. **Product foundation — complete.** Six themes, gentle self-report questions, original source-linked summaries, clear distinction between scripture and modern application.
2. **Interactive prototype — complete.** Responsive home, 12-question check-in, tied/neutral results, theme reflections, searchable library, local saving/export/deletion, and an explanation of the approach.
3. **Quality review — complete for this release.** Scoring edge cases, output escaping, storage failure handling, keyboard access, narrow-screen layout, browser flows, and the production build were checked. The content remains explicitly labeled as editorial draft, without claims of scholarly or psychological validation.
4. **GitHub publication — complete.** Source and documentation are committed and pushed to the supplied repository. The concept PDF, private notes, credentials, build caches, and browser state are excluded.
5. **Vercel deployment — complete.** The site is live at https://antar-wisdom.vercel.app and the production deployment was verified in a browser. No paid upgrade or domain purchase was needed.
6. **LLM preparation — complete for the prototype.** A structured draft corpus, synthetic response examples, separate evaluation cases, and review requirements are documented. Actual model training and live inference remain a later phase.

## Verified release — 16 October 2026

- Production URL: https://antar-wisdom.vercel.app
- Vercel deployment: `dpl_6fzckWqR2LRwVUYREPAQFfkFy7bg` (ready and aliased to the production URL).
- Website source tested: Git commit `675e268e244f9324692950daeec038132a2a0dc0`; this release record is a documentation-only follow-up.
- `npm test`: eight passing tests. `npm run build`: passed.
- Live checks: complete 12-question check-in; required answer and preserved back-navigation answer; Ramayana filter; skip link focus; save and reload; export containing the test note and source; approved deletion of the disposable test note; 390px and 320px layouts without horizontal overflow.
- Production HTML and JavaScript returned HTTP 200. The live JavaScript contains the final scripture-filter and skip-link fixes.

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
