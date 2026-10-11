# Cinematic story correction — 11 October 2026

## Diagnosis

`index.html` loads `src/main.jsx`, which mounts `App`. `src/App.jsx` renders `src/components/ScrollStory.jsx` on the homepage, under `#approach`. This was the only story component; there was no unused cinematic replacement to connect. At commit `f53b3d7`, it still contained the original three-chapter Motion/SVG diagram. Its Git history showed only the minimal redesign and uploaded-artwork integration. The previous turn removed portfolio controls, without implementing the cinematic brief. GSAP was absent from the manifest and source.

The old stage also received pale-card styling from the illustrated and neumorphic stylesheets. The replacement uses unique `odyssey-*` classes (the hero already uses `cinema-*`) and scoped stage rules loaded last in `src/main.jsx`. The homepage imports remain in place. No duplicate component was found or deleted.

## Active implementation

`src/components/ScrollStory.jsx` now renders four connected scenes: Spark, Imagination, Creation and Reveal. SVG energy trails, a luminous sphere, perspective glass forms, website/software panels, connected nodes and the existing M² Labs logo form the composition. A single scrubbed GSAP timeline handles scene crossfades, word reveals, camera transforms, trail drawing and the background return to the current page theme. The final action navigates to the existing contact section.

GSAP and ScrollTrigger load dynamically only when animation is enabled. Desktop pins the mounted track for 2.6 viewport lengths. Mobile uses a 260svh track with CSS sticky presentation, without ScrollTrigger pinning. Reduced motion, global animation pause and module-load failure show all four scenes as readable static content. The GSAP context and media queries revert on unmount/preference changes, and asynchronous initialization is cancelled after unmount. Desktop pointer tilt is separate from the timeline camera transform.

The stage clips its own visuals; its parent containers do not apply overflow clipping or transforms. Runtime diagnostic attributes expose the attached trigger, actual start/end bounds, pin status, scene and scroll progress. `data-story-version="cinematic-v1"` distinguishes the replacement from the previous deployed diagram.

## Verification and deployment

The correction passed the production build, TypeScript check and all 24 browser tests. Chromium verified the four scenes at the listed breakpoints. The built production bundle also passed forward/reverse scene scrolling, global pause/resume cleanup, desktop/mobile resizing and trigger reattachment without duplicate pins or runtime errors.

Run `npm run build`, `npm run typecheck` and `npm test`. The browser suite exercises actual scrolling in both directions across every scene at 1440px, 768px and 375px, verifies desktop/mobile pin status, checks the final CTA, and captures viewport screenshots under `/tmp/m2-odyssey-<width>-<scene>.png`. Existing checks cover layout overflow, theme contrast, enquiries, navigation, supplied artwork, hero controls and reduced motion.

`netlify.toml` declares `npm run build` and `dist`. The repository previously had no Netlify configuration; remote Netlify dashboard settings cannot be inferred from the checkout. Changes are pushed to Git main, but a successful Git push does not establish that Netlify has deployed them.

Direct access to `https://m2lab.netlify.app/` returned `CONNECT tunnel failed, response 403` in this environment. Public deployment therefore remains unverified. In Netlify, confirm the site uses this repository's `main` branch with the repository root as its base directory, and inspect or trigger the deploy for the correction commit. Once published, verify `#approach .story-track[data-story-version="cinematic-v1"]` exists and `.odyssey-track[data-scroll-trigger="attached"]` appears when motion is enabled. Check all four scenes in the published site. No Netlify access tokens were requested or exposed.
