# Validation

Validated on 6 October 2026 in the prepared cloud environment using Node.js 24 and Chromium.

- Production build: `npm run build` succeeded.
- Browser suite: 11 tests passed, covering content, menu focus and Escape, project filtering, concept dialogs, form validation and downloadable brief contents, FAQ, themes, widths of 320/390/768/1440 pixels, reduced motion, scroll-driven diagram progression, and service enquiry selection.
- axe-core WCAG scans passed for the light page, dark page and enquiry dialog, including visible-label/accessibility-name checks.
- The page remains usable with storage and WebGL unavailable; there is no runtime WebGL dependency or loading gate.
- Desktop and mobile screenshots were inspected. No horizontal overflow, broken images or browser errors were found.

## Production Lighthouse audit

Desktop preset against the local production build in headless Chromium. This is a lab measurement, not a real-user or mobile-device performance guarantee.

| Category       | Score |
| -------------- | ----: |
| Performance    |   100 |
| Accessibility  |   100 |
| Best practices |   100 |
| SEO            |   100 |

First contentful paint: 0.5 seconds. Largest contentful paint: 0.7 seconds. Cumulative layout shift: 0.002. Total blocking time: 0 milliseconds.

The scroll story uses Motion and SVG. Reduced motion or the animation pause control displays a static diagram and unpins the story so all chapters remain readable. Three.js is retained only for offline generation of the original architectural artwork.

## Delivery details

- Business email, phone, WhatsApp and address are configured from the supplied details. Enquiries prepare an email addressed to `minhajmiflal95@gmail.com` for the visitor to send; the site does not send automatically.
- The logo is a vector adaptation of the supplied reference.
- Portfolio pieces are explicitly studio concepts; no client outcomes or testimonials are claimed.
- Pushing source code to GitHub does not deploy the website or publish the cloud environment.
