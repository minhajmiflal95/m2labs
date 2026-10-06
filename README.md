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

- Blue-and-white illustrated layout based on the supplied reference, with original editable SVG artwork.
- Nine-service flow menu with distinct scenes, hover previews, keyboard selection and touch controls. Full-screen navigation also has five distinct illustrated destinations and native dialog focus management.
- A short skippable first-visit intro, pointer-responsive CSS 3D brand cube, scroll-triggered reveals, project-image reveals, desktop service stacking and a pinned three-chapter SVG story.
- Four detailed service groups with capabilities, deliverables and audience guidance, plus studio content and FAQs.
- Filterable studio concepts with project detail dialogs. These are explicitly concept work, not client claims.
- Validated project brief builder with downloadable text and clipboard support.
- Light/dark themes, reduced-motion handling, animation pause, and a readable static scroll-story fallback.
- Self-hosted fonts and original, locally rendered 3D concept artwork. No third-party image requests at runtime.

## Contact configuration

The site is configured with the business contact details in `src/data.js`:

- Email: `minhajmiflal95@gmail.com`
- Phone / WhatsApp: `+94 72 942 2261`
- Address: 441/10K, Delgahawatte Road, Ratmalana, Sri Lanka

The enquiry form prepares an email to the business address for the visitor to review and send in their email application. Download and clipboard options remain available. Direct call, WhatsApp and address-search links are included in the contact section. The site does not send messages automatically or claim delivery.

To override the recipient, copy `.env.example` to `.env.local` and set `VITE_CONTACT_EMAIL`. Empty or unset values use the configured business email. Rebuild after changing the override. A backend or form service would be needed for direct web submissions.

## Brand and content

- `public/m2-mark.svg` is a vector adaptation of the supplied logo reference, not the original uploaded file. Replace it with the original approved asset when available.
- Services, project content and the contact configuration are in `src/data.js`.
- Landing-page sections are in `src/App.jsx`; expanded copy is in `src/editorial.js`; enquiry dialogs are in `src/components/Dialogs.jsx`.
- Base styles and dialogs are in `src/styles.css`; the illustrated identity and responsive layouts are in `src/illustrated.css`.
- `src/components/ServiceScene.jsx` contains the custom SVG scenes. These recreate the reference’s visual direction; they are not extracted source vectors from the screenshot.
- `src/components/ServiceFlow.jsx` contains all nine offerings and the preview/selection logic. Hover previews are temporary; keyboard focus and touch/click commit selection.
- `src/components/BrandCube.jsx` contains the six-face CSS 3D cube and 1.2-second, once-per-session intro. Reduced-motion users skip the intro; storage failure leaves the site immediately usable.
- `src/components/ScrollStory.jsx` owns the scroll-linked SVG diagram. Three.js is used only by the artwork generator, not the live page.
- Project art is original procedural work from `src/artwork.js`; it can be regenerated while the dev server is running with `node scripts/generate-art.mjs`.
- Replace the two concept studies with verified client work before presenting them as a commercial portfolio. No customer metrics or testimonials have been invented.

## Validation

```sh
npm test
npm run build
```

Detailed results and production performance measurements are recorded in [docs/validation.md](docs/validation.md).

Browser tests use Playwright and Chromium (`/usr/bin/chromium` in this cloud environment). Set `CHROMIUM_PATH` for a different executable. Tests cover navigation/focus, concept filters, brief validation and downloads, FAQ, themes, responsive layouts, reduced motion, scroll-linked diagram progression, flow-menu hover/focus/touch states, intro recovery and WCAG checks through axe-core.

`node scripts/check-visuals.mjs` captures desktop and mobile screenshots in `/tmp` while the dev server runs. `npx prettier --write src scripts tests index.html *.js *.json README.md` formats the project.

## Deployment

Deploy `dist/` to a static host after `npm run build`. No API keys, database or private credentials are needed. Set the public contact email at build time. The site has no external analytics or tracking integrations.
