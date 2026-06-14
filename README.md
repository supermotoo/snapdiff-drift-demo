# SnapDiff drift demo

Companion repo for the tutorial **"Make 'Looks Right' a Checkable Step for Your Coding Agent"** (see [`article/article.md`](article/article.md)).

It's a small Vite + React + Tailwind "account page" wired up so an MCP-capable
coding agent (Claude Code, Cursor, Windsurf, Cline, Zed, Continue) verifies
every UI change it makes against a SnapDiff baseline — declaring what it meant
to change, so every changed region is mapped against that intent and nothing
reaches the baseline without a human approving it. (Honest framing: capable
agents are often careful about this; the point is making the visual check
provable and deliberate, and catching the cases — looser models, bigger
codebases, long autonomous runs — where carefulness slips.)

**Total setup time: ~5 minutes. Total cost: $0** (SnapDiff's free plan
includes 200 diffs/month, no credit card; no tunnel or external service required).

## Quickstart

### 1. Install

```bash
pnpm install
```

This pulls in Vite, React, and Tailwind. The MCP server uses Playwright for
local screenshot capture — you'll need the Chromium binary once:

```bash
npx playwright install chromium
```

This is a one-time ~130 MB download.

### 2. Get a free SnapDiff API key

Sign up at [snapdiff.ai](https://snapdiff.ai/signup), then:

1. **Projects → Create project**, name it `drift-demo` (note the slug).
2. **API keys → Create key** (live environment). Copy the `sd_live_...` key —
   it's shown only once.

Export the key in the shell you'll use — the MCP server reads it from the environment:

```bash
export SNAPDIFF_API_KEY=sd_live_...        # macOS/Linux
# $env:SNAPDIFF_API_KEY = "sd_live_..."    # Windows PowerShell
```

### 3. Run the dev server

```bash
pnpm dev      # Vite serves the app at http://localhost:4400
```

### 4. Connect the MCP server to your agent

**Claude Code** — the repo ships a project-scoped [`.mcp.json`](.mcp.json)
that picks up `SNAPDIFF_API_KEY` from your environment, so just start
`claude` in this directory and approve the server.

**Cursor** — [`.cursor/mcp.json`](.cursor/mcp.json) is included; open the
repo and enable the server when prompted.

Other editors: see the [snapdiff-mcp README](https://github.com/corralimited/snapdiff-mcp).

### 5. Capture baselines

Ask your agent:

> Capture baselines for the account and settings pages at localhost:4400 in the drift-demo project.

The agent calls `snapdiff_capture_baseline` twice and confirms each one with a
`build_url` you can open to verify the screenshot.

### 6. Run the exercises

The verification rules the agent follows live in [`CLAUDE.md`](CLAUDE.md) —
that's the whole trick. Include "verify with snapdiff when you're done" in each
prompt, or ask for verification separately after you're happy with the code.

**Exercise 1 — an intended change:**

> Add a "Cancel subscription" button at the bottom of the billing card, styled as a subtle red-tinted secondary button. When you're done, verify with snapdiff.

Expected outcome: verdict `expected_change_detected` (the button landed inside
the billing card), and the agent hands you a `review_url` instead of declaring
victory. Open it, eyeball the before/after/diff, click **Approve & promote
baseline**.

**Exercise 2 — a change with a wider blast radius:**

> The Pro badge on the billing card looks a bit flat — deepen our brand color to a richer violet. When you're done, verify with snapdiff.

The page's brand color is a single design token (`--color-brand` in
[src/index.css](src/index.css)) reused by the nav logo dot, the profile avatar,
and the billing "Pro" badge. What the agent does here genuinely varies:

- A careful, high-context run (e.g. **Opus, high effort**) traces the token to
  all three usages, scopes the change to just the badge, and verifies clean
  (`expected_change_detected`) — the right call, now on the record.
- A looser run (e.g. **Sonnet, medium effort**) edits the token, recoloring the
  avatar and nav too. It declares intent on the billing card, so the avatar
  recolor lands outside intent → `needs_human_review`, surfaced for a human
  instead of shipped quietly.

The point isn't that the agent is careless — often it isn't. It's that you
can't tell which kind of run you got by reading the diff, and the verification
makes the rendered result legible either way.

**Exercise 3 — when the agent catches itself:**

> The labels in the billing card are too faint to read — darken the muted text color a notch. When you're done, verify with snapdiff.

The billing card's `dt` labels (Plan, Renews, Payment method) are styled with a
hardcoded utility class (`text-slate-500`) rather than the shared `--color-muted`
token. They look identical to token-driven text — but they're not. "The muted
text *color*" points the agent at `--color-muted`, so it darkens the token and
verifies on `#billing`. But the billing labels don't consume that token — the
things that actually changed are the nav links, the subtitle, and the profile
email, all outside `#billing` → `unexpected_regression` / `rollback_and_retry`.
The agent reverts, reads the billing card source, discovers the hardcoded class,
and re-applies the change scoped to just those three `<dt>` elements —
self-correcting before any verdict reaches you.

For CI, the full-page gate catches shared-token or shared-component drift that
lands on pages the agent never opened:

```bash
snapdiff build drift-demo \
  --page account=https://your-preview.vercel.app/ \
  --page settings=https://your-preview.vercel.app/settings
```

## What's in here

| Path | Purpose |
|------|---------|
| `src/pages/Account.tsx`, `Settings.tsx` | The two pages (`/` and `/settings`), each a couple of cards. |
| `src/index.css` | Tailwind entry + two design tokens: `--color-brand` (nav/avatar/badge — Exercise 2) and `--color-muted` (nav links, subtitle, profile labels — Exercise 3). |
| `src/components/Card.tsx`, `PageHeader.tsx` | Shared components used by both pages. |
| `src/components/Nav.tsx`, `Footer.tsx` | Page chrome. |
| `CLAUDE.md` | Agent rules: page map + when to verify + how to act on verdicts. |
| `.mcp.json`, `.cursor/mcp.json` | Project-scoped MCP server config for Claude Code / Cursor. |
| `article/` | The tutorial article source and images. |

## Notes

- Baselines are keyed by project + page name + branch, **not** by URL.
- The free plan allows 1 project and 200 diffs/month; this whole tutorial uses
  fewer than 10.
- The page is static by construction (no clock, no animations), so diffs only
  ever show real changes.
- The MCP server handles `localhost` URLs natively — it runs Playwright locally,
  measures any intent-region selectors on the live page, and uploads the
  screenshot rather than asking a cloud worker to fetch the URL. For CI, point
  it at your preview deploy URL instead.
