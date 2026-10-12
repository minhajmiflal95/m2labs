# M² Labs

A responsive React website for M² Labs: creative technology, web development, connected business systems, digital marketing and academic project support.

## Run locally

Requires Node.js 22.12+ (validated with Node.js 24) and npm.

```sh
npm ci
npm run dev
```

Vite serves the app on port 5173 by default. `npm run build` creates the deployable static site in `dist/`; `npm run preview` serves that production build.

## Included

- Blue-and-white illustrated layout based on the supplied reference, with the supplied transparent illustrations.
- Three cinematic hero slides with animated typography, scene reveals, slide progress, previous/next controls, keyboard navigation and touch swipes. Autoplay pauses for hover, focus, hidden tabs and offscreen content; manual selection stops it until resumed. Reduced motion and the site-wide pause disable autoplay.
- Nine-service flow menu with context-matched uploaded artwork, hover previews, keyboard selection and touch controls. Full-screen navigation also has five distinct illustrated destinations and native dialog focus management.
- A resource-aware 2.8-second cinematic logo ident, pointer-responsive CSS 3D brand cube, scroll-triggered reveals, desktop service stacking and a full-width four-scene GSAP cinematic story.
- Four detailed service groups with capabilities, deliverables and audience guidance, plus studio content and FAQs.
- An illustrated studio exploration section with direct navigation from the header and hero.
- Validated project brief builder with downloadable text and clipboard support.
- Header light/dark toggle with saved preferences, a complete neumorphic light theme, smooth theme transitions, reduced-motion handling, animation pause, and a readable four-scene static scroll-story fallback.
- Self-hosted fonts and original, locally rendered 3D concept artwork. Uploaded illustrations are served locally in three sizes with transparency preserved. No third-party image requests at runtime.

## Contact configuration

The site is configured with the business contact details in `src/data.js`:

- Email: `minhajmiflal95@gmail.com`
- Phone / WhatsApp: `+94 72 942 2261`
- Address: 441/10K, Delgahawatte Road, Ratmalana, Sri Lanka

The enquiry form prepares an email to the business address for the visitor to review and send in their email application. Download and clipboard options remain available. Direct call, WhatsApp and address-search links are included in the contact section. The site does not send messages automatically or claim delivery.

To override the recipient, copy `.env.example` to `.env.local` and set `VITE_CONTACT_EMAIL`. Empty or unset values use the configured business email. Rebuild after changing the override. A backend or form service would be needed for direct web submissions.

## Brand and content

- `public/m2-mark.svg` is a vector adaptation of the supplied logo reference, not the original uploaded file. Replace it with the original approved asset when available.
- Services and the contact configuration are in `src/data.js`.
- Landing-page sections are in `src/App.jsx`; expanded copy is in `src/editorial.js`; enquiry dialogs are in `src/components/Dialogs.jsx`.
- `src/neumorphic.css` styles the light theme, mobile refinements and fullscreen cinematic intro.
- Base styles and dialogs are in `src/styles.css`; the illustrated identity and responsive layouts are in `src/illustrated.css`.
- `src/components/HeroSlides.jsx` contains hero content and carousel behavior; `src/hero-slides.css` styles its responsive layout.
- `src/components/ServiceScene.jsx` maps the eight uploaded PNG illustrations to each section using responsive WebP assets. See [artwork provenance and placement](docs/illustrations.md).
- `src/components/ServiceFlow.jsx` contains all nine offerings and the preview/selection logic. Hover previews are temporary; keyboard focus and touch/click commit selection.
- `src/components/BrandCube.jsx` contains the hero’s six-face CSS 3D cube. `src/components/LogoIntro.jsx` and `src/logo-intro.css` implement the 2.8-second, every-refresh GSAP logo ident using the unchanged `/m2-mark.svg` asset. It starts when the actual logo, fonts and initial page resources are ready; Skip/Escape dismiss it immediately. Reduced motion and asset failure leave the homepage usable. See [logo intro](docs/logo-intro.md).
- `src/components/ScrollStory.jsx` renders the live four-scene cinematic stage. `src/cinematic-story.css` scopes its dark-to-light visuals; GSAP and ScrollTrigger load on demand, pin on desktop, and use CSS sticky scrolling on mobile. Reduced motion and animation pause show all scenes without pinning. Three.js is used only by the artwork generator, not the live page.
- Project art is original procedural work from `src/artwork.js`; it can be regenerated while the dev server is running with `node scripts/generate-art.mjs`.
- No customer metrics or testimonials have been invented.

## Validation

```sh
npm test
npm run typecheck
npm run build
```

Detailed results and production performance measurements are recorded in [docs/validation.md](docs/validation.md).

Browser tests use Playwright and Chromium (`/usr/bin/chromium` in this cloud environment). Set `CHROMIUM_PATH` for a different executable. Tests cover navigation/focus, brief validation and downloads, FAQ, themes, responsive layouts, reduced motion, forward/reverse cinematic scene progression, flow-menu hover/focus/touch states, intro recovery and WCAG checks through axe-core.

`node scripts/check-visuals.mjs` captures desktop and mobile screenshots in `/tmp` while the dev server runs. `npx prettier --write src scripts tests index.html *.js *.json README.md` formats the project.

## Deployment

Deploy `dist/` to a static host after `npm run build`. No API keys, database or private credentials are needed. Set the public contact email at build time. The site has no external analytics or tracking integrations.

## Glyph Portal

The scroll-through-type section between the hero and services uses the supplied MIT Glyph Portal component. TypeScript, Tailwind v4 and shadcn-compatible aliases are configured. Reusable components live in `src/components/ui`, available as `@/components/ui`. See [integration and setup instructions](docs/glyph-portal.md).

Netlify builds with `npm run build` and publishes `dist`, as declared in `netlify.toml`. See [cinematic story verification](docs/cinematic-story.md) for implementation and deployment checks.
