# M² Labs cinematic logo ident

The active homepage renders `src/components/LogoIntro.jsx` from `src/App.jsx`. `src/main.jsx` imports its scoped `src/logo-intro.css` stylesheet. The ident uses the existing `/public/m2-mark.svg` unchanged: the original image and every material/reflection mask reference that exact asset. There is no replacement monogram, text logo, WebGL scene, sound or external imagery.

The 2.8-second GSAP timeline has four phases: First Light (0–0.6s), Sculpted Identity (0.6–1.4s), Signature Impact (1.4–2.1s), and Portal Transition (2.1–2.8s). A narrow violet beam, SVG-masked titanium lighting, restrained icy reflection, single specular sweep, slight perspective push, character-masked tagline and expanding radial matte reveal the mounted homepage. All scaling is uniform; the 400:310 SVG composition uses `object-fit: contain`. The ident is dark in both site themes; the portal exposes the selected homepage theme underneath.

Animation begins only after the logo decodes, document fonts are ready and the initial window load finishes. There is no fixed resource-readiness timer or fake loading progress. Skip/Escape are available while waiting. Asset/dependency failure dismisses the overlay. Session storage records playback once per tab; storage failure bypasses it. Reduced motion skips the ident, including when the preference changes during playback.

The existing native dialog handles focus and restores body scrolling on dismissal. The GSAP context is reverted, the load listener removed and asynchronous setup cancelled during cleanup. The homepage and its scroll animations remain mounted underneath. Obsolete cube-loader code and styles were removed; the separate interactive hero cube remains.

Run `npm run build`, `npm run typecheck` and `npm test`. Browser tests hold the actual logo request for more than the animation duration to prove readiness gating, then verify the timeline phases, character reveal, original SVG proportions, overlay removal and session persistence at desktop/mobile widths. They also check asset failure, Skip/Escape, changing motion preferences and restored body scrolling. Screenshots are saved to `/tmp/m2-ident-<width>-sculpted.png` and `/tmp/m2-ident-<width>-signature.png` for inspection.

Verification on 11 October 2026: production build and TypeScript checks passed; all 26 browser tests passed. Desktop/mobile screenshots were inspected, including the titanium stage, final original logo colours and fully revealed tagline. No dependencies were added and the logo asset was not modified.

Modified files:

- `src/components/LogoIntro.jsx` — new active ident and GSAP lifecycle.
- `src/logo-intro.css` — materials, masks, responsive composition and portal.
- `src/App.jsx` — mounts the new ident on the homepage.
- `src/main.jsx` — imports the ident stylesheet.
- `src/components/BrandCube.jsx` — removes the old splash while retaining the hero cube.
- `src/illustrated.css` and `src/neumorphic.css` — removes obsolete splash styling.
- `tests/site.spec.js` — adds resource readiness, logo proportions, character reveal and cleanup checks.
- `README.md` and `docs/logo-intro.md` — updates implementation and verification documentation.
