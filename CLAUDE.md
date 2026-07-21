# Snidge landing page — progress notes

Static landing page for Snidge (Electron colour picker, Windows + macOS).
Plain HTML/CSS/vanilla JS, no framework, deploy target is Vercel.

## Where things stand

- Repo is local only (`~/dev/snidge-landing`), not pushed to GitHub yet.
  Pushing/connecting Vercel is something the user wants to do manually,
  not something to automate.
- No custom domain yet. Plan: ship a free `*.vercel.app` deploy, post on
  X with a packaged Mac build to gauge interest before spending money on
  `snidge.app` or Apple Developer signing ($99/yr).
- Page currently has: Hero (logo + tagline + download buttons + demo
  video), a three-card feature section, and a footer (Feedback link →
  Tally placeholder, GitHub link, copyright).
- `assets/demo.mp4` is in place — a real recording, converted from `.mov`
  and compressed with the system's built-in `avconvert` (no ffmpeg
  installed on this machine) to 1280x720, ~6MB. If it needs re-doing:
  `avconvert --source <in> --preset Preset1280x720 --output <out> --replace`.
- Hero tagline ("A fast, fuss free colour picker for designers.") is
  styled per the designer partner's feedback: the whole line uses a
  lighter coral tint (`--color-accent-soft: #f7a09a`, reused from the
  Palette icon's tint steps) and "designers" is wrapped in
  `.hero-tagline-accent` at full `--color-accent` (#f3776e, same as the
  download buttons) so it reads as the deepest word. "for" and
  "designers" are joined with `&nbsp;` so they never break across lines.

## Key decisions made along the way

- **Brand colours/font are not invented — they're pulled from the real
  app.** Source of truth: `~/dev/snidge/src/renderer/palette/src/main.css`
  (`--coral: #f3776e`, `--blush: #feeff1`, font `Outfit`). Defined as CSS
  vars in `css/style.css` `:root`.
- **Logo**: uses the wordmark file from
  `~/dev/snidge/../.../OneDrive-UniversityofKent/Snidge/Icons/snidge_main logo.png`
  (icon + "Snidge" text, ~2.75:1 aspect ratio). `.hero-logo` is
  fixed-height/auto-width so it never distorts — do not go back to a
  fixed square size.
- **Download buttons**: deliberately simple. No platform detection, no
  SmartScreen/right-click caption text — just two buttons
  ("Download for Windows" / "Download for macOS") side by side, above
  the demo video so they're the first thing seen. User's call: figuring
  out which platform to click is on the visitor, not worth the UI
  complexity.
- **Hero background**: layered blurred blob shapes (not a single centered
  radial-gradient) using only coral + blush, to get a diffuse/mesh-gradient
  look. User explicitly chose not to introduce a third accent colour to
  stay brand-consistent.
- **Feature card icons** are hand-built, not image assets: Palette is 5
  CSS dots in solid coral tint steps (not opacity — low-opacity tints
  read as "missing/uneven" against white), Gradient is a small CSS
  gradient bar, Privacy is an inline SVG lock. All three icon containers
  must stay the same fixed box size (48px) or the card titles drift out
  of alignment — this was a real bug once, fixed by making
  `.feature-card` a column flex container.
- **No dashes rule**: user has a standing hard rule (saved to memory,
  not just this project) — no `-` or `—` in any user-facing copy.
  Rewrite around it (colon, period, "then"/"with") instead. Exception:
  CSS requires `--custom-property` syntax and kebab-case class/id names
  — those are not "copy" and are fine.
- Download link targets are GitHub releases/latest URLs, kept as
  constants at the top of `js/main.js` since filenames may change.

## Working style for this project

- Small steps: describe the change, say which file/section, explain
  why, give a concrete "open the browser and look for X" verification
  step. Wait for the user to confirm before moving to the next section.
- Git: commit straight to `main`, no branches, one thing per commit,
  short descriptive messages, no AI co-author line.

## Not done yet / likely next steps

- User confirmed footer, tagline styling, spacing, and demo video all
  look good as of the last session. Further designer feedback may still
  come in (colour/spacing tweaks) — treat those the same way: small
  step, explain, verify, commit separately from unrelated changes.
- Mobile responsiveness: breakpoints exist at 700px/600px. A true
  narrow-phone-width automated check isn't reliable on this machine
  (Chrome's CLI headless screenshot mode ignores `--window-size` below
  its ~500px minimum window size, and the user asked not to use the
  claude-in-chrome extension for this project after some flaky/
  contradictory results) — verify by asking the user to check
  DevTools' device toolbar themselves, don't try to automate it again.
- GitHub repo creation + push (user will do manually).
- Vercel connection + domain decision (deferred until there's signal
  from the X post).

## Related: the actual Snidge app repo (`~/dev/snidge`)

Separate repo, not this one, but the same user/product. Fixed one real
bug there in passing: on macOS, `npm run dev` (raw Electron, not a
packaged .app) always showed Electron's default Dock icon, because
`BrowserWindow`'s `icon` option has no effect on the Dock on macOS (only
Windows/Linux). Fixed with an explicit `app.dock?.setIcon(...)` call
gated to `process.platform === 'darwin' && is.dev` in
`src/main/index.ts`'s `app.whenReady()` handler. Packaged builds were
never affected (electron-builder already generates the icon correctly
from `build/icon.png`).
