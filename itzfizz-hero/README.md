# ItzFizz — Scroll-Driven Hero Section

A vanilla HTML / CSS / JS hero section with a GSAP-powered intro sequence and a
scroll-scrubbed car animation, built for the "Scroll-Driven Hero Section
Animation" assignment.

## What's inside

- `index.html` — markup for the hero (headline, stats, car) and a short second section
- `style.css` — design tokens, layout, responsive rules, `prefers-reduced-motion` support
- `script.js` — builds the letter-staggered headline, plays the load-in timeline,
  and drives the scroll-tied car animation with GSAP `ScrollTrigger`

No build step, no dependencies to install — GSAP is loaded from a CDN in `index.html`.

## How the requirements map to the code

- **Letter-spaced headline + staggered intro** — `buildHeadline()` and `playIntro()`
  in `script.js` split "WELCOME ITZFIZZ" into per-letter `<span>`s and stagger them in.
- **Stats animate in with a count-up** — the `.stat` cards stagger in, then
  `animateCounts()` tweens each percentage from 0 to its target.
- **Scroll-driven core animation** — `initScrollAnimation()` pins the hero with
  `ScrollTrigger` and uses a numeric `scrub` value (interpolation/easing tied
  directly to scroll position, not time) to move the car, spin its wheels,
  fill the rail/progress line, and fade the speed lines.
- **Performance** — every animated property is `transform` or `opacity` (the
  one exception, the rail fill, was switched from a layout-affecting `width`
  to a `scaleX` transform). GSAP's ScrollTrigger batches scroll reads via
  `requestAnimationFrame`, so there's no per-scroll-event layout thrashing.

## Run it locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy to GitHub Pages (to get your two submission links)

1. Create a new **public** repository on GitHub (e.g. `itzfizz-hero`).
2. Push these three files to the repo root:
   ```bash
   git init
   git add .
   git commit -m "Scroll-driven hero section"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch",
   branch `main`, folder `/ (root)`. Save.
5. GitHub gives you a live URL after ~1 minute, typically:
   `https://<your-username>.github.io/<repo-name>/`

Submit:
- **Live link:** the GitHub Pages URL from step 5
- **Repo link:** `https://github.com/<your-username>/<repo-name>`
