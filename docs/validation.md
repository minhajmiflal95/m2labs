# Validation

## Uploaded artwork — 9 October 2026

- Production build and all 20 browser tests passed, including image-loading and section-mapping checks.

- Integrated all eight illustrations from `vecotrs.rar` throughout the hero, services, process, work introduction, studio, technology, FAQ and contact sections.
- Generated 480/960/1448-pixel WebP derivatives, preserving transparency; all 24 files total approximately 4.1 MB, while each browser downloads the appropriate size.
- Desktop and mobile screenshot checks found no broken images, browser errors or horizontal overflow.
- The project concept images and animated SVG story diagram remain; uploaded illustrations accompany them. Asset provenance and placement are documented in [illustrations.md](illustrations.md).
- Earlier Lighthouse scores below predate the uploaded images and are not measurements of this update.

## Cinematic hero update — 9 October 2026

- Production build passed.
- All 19 browser tests passed: the existing 16 checks plus hero navigation/wrapping, autoplay and manual pause, and an actual horizontal touch swipe.
- Desktop and mobile screenshots checked for the first and second slides. The existing responsive and WCAG checks also passed.
- Three hero slides retain the enquiry action and support reduced motion, the global pause setting, hidden-tab and offscreen pause, hover/focus pause, and manual navigation.
- The Lighthouse results below describe the earlier 6 October design; that audit was not rerun for this incremental update.

## Illustrated redesign — 6 October 2026

Validated on 6 October 2026 in the prepared cloud environment using Node.js 24 and Chromium.

- Production build: `npm run build` succeeded.
- Browser suite: 16 tests passed, covering content, menu focus and Escape, project filtering, concept dialogs, form validation and downloadable brief contents, FAQ, themes, widths of 320/390/768/1440 pixels, reduced motion, scroll-driven diagram progression, service enquiry selection, nine distinct service scenes, mouse preview restoration, focus/arrow-key selection, rapid touch switching, the first-visit intro and interactive cube, and all five illustrated navigation destinations.
- axe-core WCAG scans passed for the light page, dark page and enquiry dialog, including visible-label/accessibility-name checks.
- The page remains usable with storage and WebGL unavailable; there is no runtime WebGL dependency. A skippable 1.2-second intro runs once per session and is omitted for reduced-motion users or unavailable storage.
- Desktop and mobile screenshots were inspected. No horizontal overflow, broken images or browser errors were found.

## Production Lighthouse audit

Desktop preset against the local production build in headless Chromium. This is a lab measurement, not a real-user or mobile-device performance guarantee.

| Category       | Score |
| -------------- | ----: |
| Performance    |   100 |
| Accessibility  |   100 |
| Best practices |   100 |
| SEO            |   100 |

First contentful paint: 0.5 seconds. Largest contentful paint: 0.6 seconds. Cumulative layout shift: 0.01. Total blocking time: 50 milliseconds.

The flow menu uses short opacity/transform transitions, mouse previews and persistent keyboard/touch selection. Arrow keys, Home and End navigate the nine services. Each scene uses original, editable SVG artwork; the reference screenshot is not treated as an extracted vector asset.

The brand cube uses CSS 3D transforms. The scroll story uses Motion and SVG. Reduced motion or the animation pause control displays a static diagram and unpins the story so all chapters remain readable. Three.js is retained only for offline generation of the original architectural artwork.

## Delivery details

- Business email, phone, WhatsApp and address are configured from the supplied details. Enquiries prepare an email addressed to `minhajmiflal95@gmail.com` for the visitor to send; the site does not send automatically.
- The logo is a vector adaptation of the supplied reference.
- Portfolio pieces are explicitly studio concepts; no client outcomes or testimonials are claimed.
- Pushing source code to GitHub does not deploy the website or publish the cloud environment.
