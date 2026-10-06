# Validation

Validated in the prepared cloud environment using Node.js 24.19.0 and Chromium.

- Frozen installation: `npm ci --cache /tmp/m2labs-npm-cache --no-audit --no-fund` succeeded.
- Production build: `npm run build` succeeded.
- Browser suite: 10 tests passed, covering rendered content, menu focus and Escape, project filtering, concept dialogs, form validation and downloadable brief contents, FAQ, themes, widths of 320/390/768/1440 pixels, reduced motion, loading-splash recovery, WebGL fallback, and actual pointer-driven 3D rendering.
- axe-core WCAG scans passed for the light page, dark page and enquiry dialog. Project art controls also receive a visible-label/accessibility-name check.
- Desktop and mobile visual checks performed using real browser screenshots.

## Production Lighthouse audit

Desktop preset, Chromium running with SwiftShader software graphics, local production server. This is a lab measurement, not a real-user or mobile-device performance guarantee.

| Category       | Score |
| -------------- | ----: |
| Performance    |    61 |
| Accessibility  |   100 |
| Best practices |   100 |
| SEO            |   100 |

First contentful paint: 0.6 seconds. Largest contentful paint: 1.7 seconds. Cumulative layout shift: 0.008. Total blocking time: 1,520 milliseconds.

The WebGL sculpture now renders on demand and settles after pointer interaction. This reduced measured blocking time from 29,830 to 1,520 milliseconds in the software-rendered environment. GPU initialization remains a performance limitation on software graphics and should be checked on target physical devices before launch. Animations respect reduced motion, and a brand-mark fallback is available when WebGL is unavailable.

## Before a public launch

- Business email, phone, WhatsApp and address are configured from the supplied details. Enquiries open an email addressed to `minhajmiflal95@gmail.com` for the visitor to send; the site does not send automatically.
- Replace the vector-adapted logo with the original approved asset if exact reproduction is required.
- Portfolio pieces are explicitly studio concepts. Replace them with verified client work if appropriate; no client outcomes or testimonials are claimed.
- No website deployment or environment publication has been performed.
