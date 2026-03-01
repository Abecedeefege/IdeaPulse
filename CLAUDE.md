# CLAUDE.md

This file is the agent operating manual for this repo.
It is shared, versioned, and updated continuously.

## Core Rule

When you make a mistake and a human corrects it, add a rule here so it does not happen again.

Use this format:
- Rule:
- Why:
- Example: (optional)

---

## Non-Negotiables

1. Plan first for non-trivial work.
2. Make small, reversible changes.
3. Match existing patterns before inventing new ones.
4. Never guess — inspect code/tests/docs first.
5. Verify before claiming completion.
6. If something goes sideways, stop and re-plan.

---

## Default Workflow

### 1) Plan
Before editing code, write a short plan:
- Goal
- Files likely to change
- Risks / edge cases
- Verification steps

### 2) Implement
- Make the smallest change that solves the problem
- Avoid unrelated edits
- Reuse existing utilities / patterns
- Keep code readable

### 3) Verify
Run the relevant checks and report results:
- tests
- typecheck
- lint
- build
- manual verification (if needed)

Do not say "done" without verification evidence.

### 4) Learn
If a correction happened, update this file.

---

## Verification Rule (Most Important)

Always give yourself a feedback loop.

Prefer:
- automated tests
- typecheck/lint/build
- local run
- UI/browser checks (for frontend)
- CLI command output (for scripts/tools)

If no automated verification exists, provide a manual checklist and expected outcomes.

---

## Agent Behavior Rules

### Planning
- Start in plan mode for complex tasks
- If implementation fails twice, re-plan before continuing
- State assumptions explicitly

### Planning / Multi-item work
- Rule: When planning a list of items (multiple features, fixes, or tasks), create separate plan files by topic, each small and revertible. Do not put everything in one large plan.
- Why: The user can approve and build each plan file independently and validate incrementally; reverting is easier and checking "what's done" is clearer.
- Example: For "fix auth, fix email, and add logging", create e.g. `plan_auth_fix.md`, `plan_email_fix.md`, `plan_logging.md` instead of one combined plan.
- Rule: When the user suggests changes in plan mode, always create one or more **MD plan files** (in `docs/plans/` or agreed location), one file per topic, so the user can approve and build them individually. Do not deliver a single mixed plan when the request contains multiple distinct items.
- Rule: If you cannot create a plan file (e.g. information or instructions are missing), say so explicitly and list what is missing; do not deliver a half-done or combined plan.
- Why: Ensures every suggested change is in a buildable, revertible plan file and avoids half-done work.

### Documentation / Deployment (Vercel and Supabase)
- Rule: When giving Vercel or Supabase instructions, be **super specific** and list them **step-by-step** (numbered steps, one action per step). No vague "configure X"; use exact menu paths and variable names.
- Why: Vague instructions lead to misconfiguration and support back-and-forth; exact steps are reproducible.

### After implementing a plan
- Rule: When you implement a change from a plan, share in the response: (1) the **plan file or instructions** followed (path or link), and (2) a **production link** where the user can check the change live (or note "N/A" for docs-only changes).
- Why: The user can verify the implementation and open the live site without guessing the URL.

### Editing
- Avoid broad refactors unless requested
- Preserve API contracts unless explicitly changing them
- Do not silently rename fields or break interfaces

### Debugging
- Reproduce first
- Fix root cause, not just symptoms
- Add a regression test when possible

### Reviews
- Critique your own diff before finalizing:
  - unnecessary complexity?
  - broken edge cases?
  - style mismatch?
  - missing tests?
  - missing docs?

---

---

## OpenAI / API Safety Rules 

- Never hardcode API keys
- Use `.env` / environment variables only
- Do not log secrets
- Redact secrets from screenshots, traces, and debug output
- Add usage/cost logging where relevant
- Handle rate limits and retries explicitly
- Fail gracefully on API errors

---

## Definition of Done

A task is done only when:
- [ ] The plan is clear (for non-trivial tasks)
- [ ] Code changes are complete
- [ ] Relevant checks were run
- [ ] Results were reported
- [ ] Edge cases were considered
- [ ] `CLAUDE.md` was updated if a new mistake pattern was found

---

## First Rules to Add (starter examples)

- Rule: Run typecheck before tests when both exist.
  Why: It fails faster and catches structural issues early.

- Rule: If UI changes are made, verify in a browser (or equivalent visual check).
  Why: Passing tests can still hide visual regressions.

- Rule: Prefer existing utilities over new helpers.
  Why: Duplicate helpers create drift and inconsistency.

- Rule: When the user needs to open a URL (e.g. local dev server, CMS, preview), run the relevant command yourself and tell them explicitly when to open the URL (e.g. "Server is running. Open http://localhost:3750/cco-report-cms.html in your browser.").
  Why: The user has asked repeatedly for the agent to run commands and indicate when to open the URL; doing it avoids back-and-forth.

- Rule: Perform all terminal commands (build, lint, typecheck, push) when the user asks for minimal intervention or to "perform" commands. Only leave a step for the user when the environment cannot do it (e.g. git push requires their credentials).
  Why: Reduces back-and-forth; user wants one-shot execution where possible.

- Rule: When git push fails with "could not read Username" or similar auth error, tell the user exactly one manual step: run `git push origin main` from their machine, and that the commit is already created locally.
  Why: They need to push once from an authenticated environment; no need to re-stage or re-commit.

- Rule: Always run push commands when the user asks to push, deploy, or ship to production: run `git add -A`, `git commit` (if there are changes), then `git push origin main`. Do not skip the push step.
  Why: The user expects the agent to perform all terminal commands including push; they asked to "always push commands."

---

## Final Instruction

Be explicit.
Verify everything.
Turn every corrected mistake into a permanent rule.
