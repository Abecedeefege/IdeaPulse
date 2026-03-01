# Plan: Always create MD plan files in plan mode

## Rule (add to CLAUDE.md)

Under "Planning / Multi-item work" or "Agent Behavior Rules":

- **Rule:** When the user suggests changes in plan mode, always create one or more **MD plan files** (in `docs/plans/` or agreed location), one file per topic, so the user can approve and build them individually. Do not deliver a single mixed plan when the request contains multiple distinct items.
- **Rule:** If you cannot create a plan file (e.g. information or instructions are missing), say so explicitly and list what is missing; do not deliver a half-done or combined plan.
- **Why:** Ensures every suggested change is in a buildable, revertible plan file and avoids half-done work.

## Implementation

Add these two rules to [CLAUDE.md](../CLAUDE.md) in the Planning / Multi-item work section.
