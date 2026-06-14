# snapdiff-drift-demo

A small Vite + React + Tailwind app. Run it with `pnpm dev` (port 4400).

## Structure

- `src/pages/Account.tsx` — the Account page (`/`): Profile and Billing cards.
- `src/pages/Settings.tsx` — the Settings page (`/settings`): Notifications and
  Security cards.
- `src/components/PageHeader.tsx` — shared page title + subtitle, used by every page.
- `src/components/Card.tsx` — shared card component, used by every section.
- `src/index.css` — Tailwind entry and the `--color-brand` / `--color-muted` design tokens.
- `src/components/Nav.tsx`, `src/components/Footer.tsx` — page chrome.

## SnapDiff tools

**Project**: `drift-demo`

**Page map**:
- `/` → `account`
- `/settings` → `settings`

### snapdiff_capture_baseline
Captures the current state of a page as the baseline. Run once per page before
any verification. Localhost URLs are captured locally — no tunnel needed.

### snapdiff_verify_ui_change
Captures the current state of a page and diffs it against the baseline. Pass:
- `project`: `drift-demo`
- `page_name`: from the page map above
- `after`: the localhost URL for that route
- `intent`: one sentence on what changed
- `intent_regions`: a CSS selector for the area that was supposed to change

If the verdict is `rollback_and_retry`:
1. **Revert the change immediately** — before any investigation or retry.
2. Investigate in the code to understand why the change touched unintended areas.
3. Re-apply the change scoped to only the intended region and verify again.

Do not widen `intent_regions` to clear the flag. Do not call `snapdiff_check_build` as a substitute for rolling back — a clean build result does not override a `rollback_and_retry` verdict.

### snapdiff_check_build
Captures every page and diffs them all in one build. Use this when a change
touched a shared component or design token and you want to see the full blast
radius across all pages.
