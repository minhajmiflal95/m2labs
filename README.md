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

- Interactive Three.js metallic sculpture and a skippable first-visit loading splash.
- Flowing full-screen navigation with native dialog focus management.
- Scroll reveals, desktop sticky service stacking, and liquid project hover reveals.
- Four service groups covering all requested offerings.
- Filterable studio concepts with project detail dialogs. These are explicitly concept work, not client claims.
- Validated project brief builder with downloadable text and clipboard support.
- Light/dark themes, reduced-motion handling, animation pause, and WebGL fallback.
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
- Form and landing-page sections are in `src/App.jsx`.
- Shared visual tokens and responsive styles are in `src/styles.css`.
- `src/components/Sculpture.jsx` owns the Three.js scene and cleanup.
- Project art is original procedural work from `src/artwork.js`; it can be regenerated while the dev server is running with `node scripts/generate-art.mjs`.
- Replace the two concept studies with verified client work before presenting them as a commercial portfolio. No customer metrics or testimonials have been invented.

## Validation

```sh
npm test
npm run build
```

Detailed results and the software-graphics performance limitation are recorded in [docs/validation.md](docs/validation.md).

Browser tests use Playwright and Chromium (`/usr/bin/chromium` in this cloud environment). Set `CHROMIUM_PATH` for a different executable. Tests cover navigation/focus, concept filters, brief validation and downloads, FAQ, themes, responsive layouts, reduced motion, WebGL fallback and WCAG checks through axe-core.

`node scripts/check-visuals.mjs` captures desktop and mobile screenshots in `/tmp` while the dev server runs. `npx prettier --write src scripts tests index.html *.js *.json README.md` formats the project.

## Deployment

Deploy `dist/` to a static host after `npm run build`. No API keys, database or private credentials are needed. Set the public contact email at build time. The site has no external analytics or tracking integrations.
