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
  video) and a three-card feature section. No footer section yet
  (Feedback link / GitHub link / copyright from the original spec).
- `assets/demo.mp4` does not exist yet — the empty white box under the
  download buttons is expected until the user drops in a real recording.

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

- Footer section (Feedback link → Tally placeholder, GitHub link,
  copyright).
- Real `assets/demo.mp4` and final logo/icon refinement from the
  designer partner if it changes again.
- Mobile responsiveness check (breakpoints exist at 700px/600px but
  haven't been eyeballed carefully on an actual small screen).
- GitHub repo creation + push (user will do manually).
- Vercel connection + domain decision (deferred until there's signal
  from the X post).
