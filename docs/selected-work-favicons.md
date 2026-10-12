# Portal cleanup, Selected Work and authentic favicon exports

## Implemented UI

The active homepage remains `src/main.jsx` → `src/App.jsx`. `LabsPortal` continues to render the existing Glyph Portal story between the hero and services. The current generated `gp-r5-content` ID belongs to this shared component; the ID is not hardcoded.

Entry-letter selection has been removed completely: dropdown/listbox, trigger and label, direct letter-radio hitboxes, selection state, input handlers, outside-pointer dismissal listener, keyboard focus frames, illumination-preview animation, hitbox geometry and selector-only CSS. The demonstration wrapper's obsolete interactive prop/styles are also removed. The automatic measured-ink SVG camera and its scroll/resize observers remain. Primary story, entry link, focus-accessible content, no-canvas fallback and reduced-motion reading layout remain. No hidden selector or reserved control spacer is rendered.

The former Explorations heading-only section is replaced in the active `#work` slot with Selected Work. Desktop has a two-column editorial grid; small screens stack the cards. Existing supplied vector scenes, type families, button styles, theme colors and restrained one-time scroll reveals are reused. Light-mode card/detail surfaces are white; dark mode retains existing theme tokens. Desktop and mobile navigation now call the destination “Selected Work”.

Six project briefs are explicitly illustrative:

| Brief                                | Label                  | Proposed stack                                                                                             |
| ------------------------------------ | ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| Retail Inventory & POS               | Concept project        | Java, Spring Boot, React, Node.js, MySQL, Apache Tomcat, WebSockets, Azure, Maven                          |
| Tourism Booking Experience           | Concept project        | Laravel, PHP, MySQL, responsive UI/UX                                                                      |
| SME Cloud & IT Infrastructure        | Reference architecture | Microsoft365, Azure, Microsoft Entra ID, Microsoft Intune, Azure Backup                                    |
| Local Business Digital Growth        | Campaign concept       | SEO, Meta Ads, Google Analytics, branding, content strategy, lead generation for a Sri Lankan gem business |
| ERP Sales & Inventory Integration    | Integration concept    | Odoo, PostgreSQL, REST APIs, webhooks, data mapping                                                        |
| University Research & ML Application | Research concept       | Python, scikit-learn, FastAPI, React, Jupyter                                                              |

Each card has category, label, description, stack and an accessible detail button. The shared native dialog contains its own challenge, three proposed approach stages, four scoped outputs, stack, relevant service link and enquiry handoff. These are concept briefs and reference architectures; no completed client delivery, runnable backend, production deployment, testimonial or measured outcome is asserted.

## Icon source and assets

The source of truth is the existing, unchanged `public/m2-mark.svg`. The previous `favicon.svg` was a separate generic text monogram on a dark rounded tile. It is replaced with the real project asset's complete paths, gradients and numeral. Its canvas changes from400×310 to400×400 with45 units of transparent vertical padding; the mark itself is not stretched, cropped or redrawn.

- `public/favicon.svg`: authentic vector mark on a transparent square canvas.
- `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/favicon-48x48.png`: native-size Chromium raster exports with alpha transparency.
- `public/favicon.ico`:16,32,48px PNG frames in a standards-compliant ICO container.
- `public/apple-touch-icon.png`:180×180, authentic mark on an intentional `#f4f5f7` background for platform readability.

`index.html` registers ICO,16/32px PNG, SVG and Apple links. The SVG URL uses `?v=2` so the previous icon URL is refreshed. Production route HTML inherits these links. No web manifest exists, so no Android/PWA manifest or installability changes were required.

Reproduction: `node scripts/generate-favicons.mjs`. It uses the installed Playwright browser (`CHROMIUM_PATH` may override it), Python3 and Pillow. Python verifies PNG dimensions/transparency and all three ICO sizes. Icons are committed; normal `npm run build` uses them directly.

## Exact modified files

- `src/App.jsx`
- `src/components/SelectedWork.jsx`
- `src/selected-work.js`
- `src/selected-work.css`
- `src/components/ui/glyph-portal.tsx`
- `src/components/ui/glyph-portal-demo.tsx`
- `src/glyph-portal.css`
- `index.html`
- `public/favicon.svg`
- `public/favicon.ico`
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/favicon-48x48.png`
- `public/apple-touch-icon.png`
- `scripts/generate-favicons.mjs`
- `tests/site.spec.js`
- `tests/services-complete.spec.js`
- `tests/selected-work.spec.js`
- `README.md`
- `docs/glyph-portal.md`
- `docs/selected-work-favicons.md`

The existing logo asset, services/data, cinematic loading intro, four-scene GSAP story, contact information, routing configuration, dependency declarations and lockfile are unchanged.

## Verification

- Real Chromium tested320,360,375,390,430,768,1024,1280,1440,1920px widths. Selector absence, automatic camera progression, complete story access, project/dialog layout and horizontal overflow were checked.
- All six concept views, stack/scope content, relevant service URLs, project-specific enquiry selection, Escape, keyboard focus restoration and scroll-lock cleanup passed.
- Selected Work and detail accessibility passed in light/dark themes. Existing landing/form/dark-theme and service-page scans also passed.
- PNG dimensions and alpha corners passed browser decoding checks. ICO contains16/32/48px frames and is decoded by Chromium. SVG matches the existing source mark except its transparent square canvas.
- Desktop/mobile gallery/detail screenshots, selector-free portal captures,180px Apple icon and native16/32px browser image previews were visually inspected. Validation images live under `/tmp/m2-selected-*`, `/tmp/m2-work-production-*` and `/tmp/m2-favicon-small-preview.png`. Gallery-only full-section captures suppress the sticky header/skip link for readable audit images; interaction tests verify the actual header.
- `npm run typecheck`: passed.
- `npm run build`: passed; nine route metadata documents, eight exact service rewrites and sixteen legacy redirects retained.
- Full Playwright suite:57 passed in6.9minutes, including existing services, routes, history, theme, artwork, forms, intro and cinematic timelines.
- Final affected checks after the white-surface refinement:2 passed in13.8seconds (ten-width dialog/focus layout and both-theme gallery/detail accessibility).
- Production preview: passed for six concepts, selector absence, detail-to-service and Back navigation, nine route documents with the new icon links, six icon responses and ICO decoding; zero page errors.
- `git diff --check`: passed. No lint command is supplied by the repository.

## Unverified surfaces and deployment

Headless Chromium verifies image decoding, head links and small-size rendering; native browser-tab chrome and physical iOS/Android bookmark screens were not available. Public Netlify access returns CONNECT403 from the environment proxy, so public deployment is not claimed. Source is pushed to main under the user's existing authorization. Netlify should build main with `npm run build` and publish `dist`; confirm that deployment or trigger it if automatic builds are disabled.
